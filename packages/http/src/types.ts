import { DEFAULT_CONFIG } from './constants';
import { Nullable, RequiredByKeys } from './helpers/utility-types';

export type RequestMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH';

export type RequestHeaders = {
	[key: string]: string;
};

export type SendBody = Nullable<Document | XMLHttpRequestBodyInit | undefined>;

export type RequestConfig = {
	url?: string;
	baseUrl?: string;
	method?: RequestMethod;
	headers?: RequestHeaders;
	params?: SendBody | object;
	timeout?: number;
	withCredentials?: boolean;
	async?: boolean;
	responseType?: XMLHttpRequestResponseType;
	signal?: AbortSignal;
	onDownloadProgress?: (ProgressEvent) => any;
	onUploadProgress?: (ProgressEvent) => any;
};

export type GlobalRequestConfig = RequiredByKeys<RequestConfig, keyof typeof DEFAULT_CONFIG>;

export type UserConfig = RequiredByKeys<RequestConfig, 'url'>;

export type ResponseHeaders = {
	[key: string]: string;
};
export type ResponseData = {
	data: unknown;
	status: number;
	statusText: string;
	request: XMLHttpRequest;
	headers: Nullable<ResponseHeaders>;
	config: RequestConfig;
};
