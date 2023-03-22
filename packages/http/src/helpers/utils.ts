export const isObject = (target: unknown): boolean => {
	if (!target) return false;
	return Object.prototype.toString.call(target) === '[object Object]';
};

export const createFormData = (target: object): FormData => {
	const formData = new FormData();
	return Object.entries(target).reduce((pre, [key, value]) => {
		pre.append(key, value);
		return pre;
	}, formData);
};

export const getQuery = (url: string) => {
	return url.match(/([^?=&]+)(=([^&])*)/g)?.reduce((pre, cur) => {
		const [key, value] = cur.split('=');
		pre[key] = value;
		return pre;
	}, {});
};

export const getUrlPath = (url: string): string => {
	if (url.indexOf('?') === -1) return url;
	return url.split('?')[0];
};

export const mergeUrl = (path: string, query?: object): string => {
	if (!query) return path;

	return Object.entries(query).reduce((pre, [key, value], index) => {
		pre += index === 0 ? '?' : '&';
		pre += `${key}=${value}`;
		return pre;
	}, path);
};
