export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type RequestHeader = {
	[key: string]: string;
};
export type RequestConfig = {
	url: string;
	baseUrl?: string;
	method?: RequestMethod;
	headers?: RequestHeader;
	params?: unknown;
	timeout: number;
	withCredentials: boolean;
};
