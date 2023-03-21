import { InternalError } from '../error';

export const parseResponseHeaders = (headers: string) => {
	if (headers === '') return null;
	const headersArray = headers.trim().split(/[\r\n]+/);
	return headersArray.reduce((pre, line) => {
		const [header, ...value] = line.split(': ');
		pre[header] = value.join(': ');
		return pre;
	}, {});
};

export const parseResponseData = (request: XMLHttpRequest) => {
	if (!request.responseType || request.responseType === 'text') {
		try {
			!request.responseText
				? { status: 0, msg: '请求失败' }
				: JSON.parse(request.responseText);
		} catch (error) {
			throw new InternalError('无法解析responseText: ' + request.responseText);
		}
	}
	return request.response;
};
