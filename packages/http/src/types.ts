import { DEFAULT_CONFIG } from './constants';

export type Merge<T> = {
	[K in keyof T]: T[K];
};

export type RequiredByKeys<T, K = keyof T> = Merge<
	{
		[P in keyof T as P extends K ? P : never]-?: T[P];
	} & {
		[P in keyof T as P extends K ? never : P]: T[P];
	}
>;

export type RequestMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH';

export type RequestHeaders = {
	[key: string]: string;
};

export type SendBody = Document | XMLHttpRequestBodyInit | null | undefined;
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
	onDownloadProgress?: (ProgressEvent) => any;
	onUploadProgress?: (ProgressEvent) => any;
	signal?: AbortSignal;
};

export type GlobalRequestConfig = RequiredByKeys<RequestConfig, keyof typeof DEFAULT_CONFIG>;

export type UserConfig = RequiredByKeys<RequestConfig, 'url' | 'baseUrl' | 'method'>;

export type Interceptors = {
	// response: [];
	// request: [];
};

export type ResponseHeaders = {
	[key: string]: string;
};
export type ResponseData = {
	data: unknown;
	status: number;
	statusText: string;
	request: XMLHttpRequest;
	headers: ResponseHeaders | null;
	config: RequestConfig;
};
