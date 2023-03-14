export const RegexRules = {
	num: {
		value: /^[0-9]+$/,
		message: '请输入数字',
	},
	letter: {
		value: /^[A-Za-z]+$/,
		message: '请输入字母',
	},
	mobile: {
		value: /^1[3-9]\d{9}$/,
		message: '手机号格式不正确',
	},
	phone: {
		value: /^0\d{2,3}-\d{7,8}$/,
		message: '座机号格式不正确',
	},
	url: {
		value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
		message: 'url地址格式不正确',
	},
	email: {
		value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
		message: '邮箱格式不正确',
	},
	base64: {
		value: /^\s*data:([a-z]+\/[a-z]+(;[a-z-]+=[a-z-]+)?)?(;base64)?,[a-z0-9!$&',()*+;=\-._~:@/?%\s]*\s*$/i,
		message: 'base64格式不正确',
	},
	name: {
		value: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
		message: '请不要输入特殊字符',
	},
	hanzi: {
		value: /^[\u4e00-\u9fa5]+$/,
		message: '请输入汉字',
	},
	wechat: {
		value: /^[a-zA-Z\d_-]{5,}$/,
		message: '请输入正确的微信号',
	},
	date: {
		value: /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/,
		message: '日期格式不正确',
	},
	time: {
		value: /\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/,
		message: '时间格式不正确',
	},
	positiveInteger: {
		value: /^[1-9]\d*$/,
		message: '请输入正整数',
	},
};
