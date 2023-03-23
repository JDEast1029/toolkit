export const isObject = (target: unknown): target is object => {
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
