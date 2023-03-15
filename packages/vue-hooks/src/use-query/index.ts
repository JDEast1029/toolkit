import { useRoute } from 'vue-router';

export const useQuery = () => {
	const route = useRoute();

	// 从query内获取指定key的值，针对数组做了转化处理
	const getTargetQuery = (queryField: string, fields: string | string[]): object => {
		const result = {};
		let value = route.query[queryField];
		if (value !== undefined && value !== null) {
			value = (<string>value).split(',');
			// 如果是字符串，则表示只取最后一个值
			if (typeof fields === 'string') {
				result[fields] = value[value.length - 1];
			} else {
				value.forEach((el, index) => {
					result[fields[index]] = el;
				});
			}
			result[queryField] = '';
		}
		return result;
	};

	// TODO: 其他关于Query的操作

	return {
		getTargetQuery,
	};
};
