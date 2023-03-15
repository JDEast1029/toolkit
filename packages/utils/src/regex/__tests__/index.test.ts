import { Regex } from '..';
import { isEmptyValue } from '../utils';

test('Regex returned something', () => {
	expect(Regex).toBeDefined();
});

test('Regex inject should work', () => {
	Regex.inject('email', {
		value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
		message: '邮箱格式不正确',
	});
	Regex.inject('email1', {
		value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
		message: '邮箱格式不正确',
	});
	expect(Regex.regexRules.email1).toBeDefined();
});

test('Regex validator should work', () => {
	let errorMsg = '';

	// 格式不正确
	Regex.validator({ type: 'mobile', validator: Regex.validator }, '1111111', (msg) => {
		errorMsg = msg;
	});
	expect(errorMsg).toBe('手机号格式不正确');

	// 没有这个校验规则
	Regex.validator({ validator: Regex.validator }, '1111111', (msg) => {
		errorMsg = msg;
	});
	expect(errorMsg).toBeUndefined();

	// 必填校验
	Regex.validator(
		{ required: true, type: 'mobile', message: '请输入手机号', validator: Regex.validator },
		undefined,
		(msg) => {
			errorMsg = msg;
		},
	);
	expect(errorMsg).toBe('请输入手机号');
	// 必填校验
	Regex.validator(
		{ required: true, type: 'mobile', validator: Regex.validator },
		undefined,
		(msg) => {
			errorMsg = msg;
		},
	);
	expect(errorMsg).toBe('手机号格式不正确');

	// 正确的
	Regex.validator(
		{ type: 'mobile', message: '请输入手机号', validator: Regex.validator },
		'18758093863',
		(msg) => {
			errorMsg = msg;
		},
	);
	expect(errorMsg).toBeUndefined();
});

test('isEmptyValue should work', () => {
	expect(isEmptyValue('', 'array')).toBeTruthy();
	expect(isEmptyValue([], 'array')).toBeTruthy();
	expect(isEmptyValue([1, 2], 'array')).toBeFalsy();
	expect(isEmptyValue('111', 'string')).toBeFalsy();
	expect(isEmptyValue(0, 'number')).toBeFalsy();
});
