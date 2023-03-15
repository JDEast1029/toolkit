export const isEmptyValue = (value: unknown, type?: string) => {
	if (value === null || value === undefined) return true;

	if (type === 'array' && Array.isArray(value) && !value.length) return true;

	if (typeof value === 'string' && !value) return true;

	return false;
};
