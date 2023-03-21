import { RequestMethod } from './types';

export const DEFAULT_CONFIG = {
	method: 'GET' as RequestMethod,
	timeout: 30 * 1000, // 30s
	withCredentials: false,
	async: false,
	responseType: 'json' as XMLHttpRequestResponseType,
};
