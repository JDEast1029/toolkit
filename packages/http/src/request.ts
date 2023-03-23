// import { Utils } from '@sft/utils';
import { DEFAULT_CONFIG } from './constants';
import { parseResponseHeaders, parseResponseData } from './helpers/parse-response';
import { GlobalRequestConfig, UserConfig, ResponseData, SendBody, RequiredByKeys } from './types';
import { ClientError, ServerError, InternalError, RequestError } from './error';
import { mergeConfig } from './helpers/merge-config';
import { createFormData, getQuery, getUrlPath, isObject, mergeUrl } from './helpers/utils';
import { InterceptorManage } from './interceptor/index';

export default class HttpRequest {
	globalConfig: GlobalRequestConfig;
	interceptors = {
		request: new InterceptorManage(),
		response: new InterceptorManage(),
	};

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

	private createFetchUrl(userConfig: UserConfig) {
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
			query = userConfig.params;
		}

		url = mergeUrl(getUrlPath(url), {
			...getQuery(url),
			...query,
		});
		return url;
	}

	private dispatchRequest(config: UserConfig): Promise<ResponseData> {
		const userConfig = mergeConfig<RequiredByKeys<UserConfig, keyof typeof DEFAULT_CONFIG>>(
			config,
			this.globalConfig,
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
					request = null;
				}
			};
			if (typeof userConfig.onDownloadProgress === 'function') {
				request.addEventListener('progress', userConfig.onDownloadProgress);
			}

			if (typeof userConfig.onUploadProgress === 'function' && request.upload) {
				request.upload.addEventListener('progress', userConfig.onUploadProgress);
			}

			// Network error
			request.onerror = (event) => {
				reject(new RequestError('网络错误', request, userConfig));
				request = null;
			};

			// abort
			if (userConfig.signal) {
				userConfig.signal.onabort = (event) => {
					if (!request) return;
					reject(new RequestError('请求被终止', request, userConfig));
					request.abort();
					request = null;
				};
			}

			try {
				// Document | Blob | BufferSource | FormData | URLSearchParams | string
				let params: SendBody = null;

				// GET 和 HEAD请求参数需要跟在url上
				let url = new URL(userConfig.url, userConfig.baseUrl).href;
				if (['GET', 'HEAD'].includes(userConfig.method.toUpperCase())) {
					url = this.createFetchUrl(userConfig);
				} else if (isObject(userConfig.params)) {
					params = createFormData(userConfig.params as object);
				} else {
					params = userConfig.params;
				}

				// open url
				request.open(userConfig.method, url, userConfig.async);

				// set headers 需要在 open 和 send之间设置
				this.setHeaders(request, userConfig);
				// responseType需要在 open 和 send之间设置
				request.responseType = userConfig.responseType;

				// send data
				request.send(params);
			} catch (error) {
				reject(new ClientError(`${error.name}: ${error.message}`, request, userConfig));
			}
		});
	}

	request(config: UserConfig) {
		const promiseChain = [
			...this.interceptors.request.interceptors,
			this.dispatchRequest.bind(this),
			...this.interceptors.response.interceptors,
		];

		return promiseChain.reduce(
			(pre, interceptor) => pre.then(interceptor),
			Promise.resolve(config),
		);
	}
}
