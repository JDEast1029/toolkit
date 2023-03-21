import { Utils } from '@sft/utils';
import { DEFAULT_CONFIG } from './constants';
import { parseResponseHeaders, parseResponseData } from './helpers/parse-response';
import { GlobalRequestConfig, UserConfig, ResponseData, SendBody, RequiredByKeys } from './types';
import { ClientError, ServerError } from './error';
import { mergeConfig } from './helpers/merge-config';
import { createFormData, isObject } from './helpers/utils';

export default class HttpRequest {
	globalConfig: GlobalRequestConfig;
	constructor(globalConfig?: object) {
		this.globalConfig = mergeConfig<GlobalRequestConfig>(globalConfig || {}, DEFAULT_CONFIG);
	}

	private setHeaders(request: XMLHttpRequest, userConfig: UserConfig) {
		if (userConfig.headers) {
			Object.entries(userConfig.headers).forEach(([key, value]) => {
				request && request.setRequestHeader(key, value);
			});
		}
	}

	private createGetUrl(userConfig: UserConfig) {
		let url = new URL(userConfig.url, userConfig.baseUrl).href;
		let query = {};
		if (typeof userConfig.params === 'string') {
			query = userConfig.params
				.replace(/\?/g, '')
				.split('&')
				.reduce((pre, cur) => {
					const [key, value] = cur.split('=');
					pre[key] = value;
					return pre;
				}, {});
		} else if (isObject(userConfig.params)) {
			query = <object>userConfig.params;
		}
		url = Utils.mergeUrl(Utils.getUrlPath(url), {
			...Utils.getQuery(url),
			...query,
		});
		return url;
	}

	request(config: UserConfig) {
		const userConfig = mergeConfig<RequiredByKeys<UserConfig, keyof typeof DEFAULT_CONFIG>>(
			this.globalConfig,
			config,
		);

		let request: XMLHttpRequest | null = new XMLHttpRequest();

		request.timeout = userConfig.timeout;

		return new Promise((resolve, reject) => {
			if (request === null) return;
			/* listener */
			request.onloadend = (event) => {
				if (request === null) return;

				try {
					const responseHeaders = parseResponseHeaders(request.getAllResponseHeaders());

					const response: ResponseData = {
						data: parseResponseData(request),
						status: request.status,
						statusText: request.statusText,
						request: request,
						headers: responseHeaders,
						config: userConfig,
					};

					if ((request.status >= 200 && request.status < 300) || request.status === 304) {
						resolve(response);
					} else if (request.status >= 400 && request.status < 500) {
						throw new ClientError(request.status, request, userConfig);
					} else if (request.status >= 500) {
						throw new ServerError(request.status, request, userConfig);
					}
					// Clean up request
					request = null;
				} catch (error) {
					// 解析过程错误
					reject(error);
				}
			};
			if (typeof config.onDownloadProgress === 'function') {
				request.addEventListener('progress', config.onDownloadProgress);
			}

			if (typeof config.onUploadProgress === 'function' && request.upload) {
				request.upload.addEventListener('progress', config.onUploadProgress);
			}

			// Network error
			request.onerror = (event) => {
				reject(new ClientError('Network error', request, userConfig));
				request = null;
			};

			// set headers
			this.setHeaders(request, config);

			// Document | Blob | BufferSource | FormData | URLSearchParams | string
			let params: SendBody = null;

			// GET 和 HEAD请求参数需要跟在url上
			let url = new URL(userConfig.url, userConfig.baseUrl).href;
			if (['GET', 'HEAD'].includes(userConfig.method.toUpperCase())) {
				url = this.createGetUrl(userConfig);
			} else if (isObject(userConfig.params)) {
				params = createFormData(userConfig.params as object);
			} else {
				params = <SendBody>userConfig.params;
			}

			// open url
			request.open(userConfig.method, url, userConfig.async);

			// responseType需要在 open 和 send之间设置
			request.responseType = userConfig.responseType;

			// send data
			request.send(params);
		});
	}
}
