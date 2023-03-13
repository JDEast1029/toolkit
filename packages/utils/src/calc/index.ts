import { CalcParam, ExtendFunction } from './types';

/**
 * 浮点数计算 加法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
const add = (arg1: CalcParam, arg2: CalcParam): number => {
	let r1, r2, m, c;
	try {
		r1 = arg1.toString().split('.')[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split('.')[1].length;
	} catch (e) {
		r2 = 0;
	}
	c = Math.abs(r1 - r2);
	m = Math.pow(10, Math.max(r1, r2));
	if (c > 0) {
		let cm = Math.pow(10, c);
		if (r1 > r2) {
			arg1 = Number(arg1.toString().replace('.', ''));
			arg2 = Number(arg2.toString().replace('.', '')) * cm;
		} else {
			arg1 = Number(arg1.toString().replace('.', '')) * cm;
			arg2 = Number(arg2.toString().replace('.', ''));
		}
	} else {
		arg1 = Number(arg1.toString().replace('.', ''));
		arg2 = Number(arg2.toString().replace('.', ''));
	}
	return (arg1 + arg2) / m;
};

/**
 * 浮点数计算 减法
 * @param arg1
 * @param arg2
 * @returns {string} 返回string类型，保证['1.00'] 不会变成 [1]
 */
const sub = (arg1: CalcParam, arg2: CalcParam): string => {
	let r1, r2, m, n;
	try {
		r1 = arg1.toString().split('.')[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split('.')[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	n = r1 >= r2 ? r1 : r2;
	return ((+arg1 * m - +arg2 * m) / m).toFixed(n);
};
/**
 * 浮点数计算 乘法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
const mul = (arg1: CalcParam, arg2: CalcParam): number => {
	let m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
	try {
		m += s1.split('.')[1].length;
	} catch (e) {}
	try {
		m += s2.split('.')[1].length;
	} catch (e) {}
	return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
};
/**
 * 浮点数计算 除法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
const div = (arg1: CalcParam, arg2: CalcParam): number => {
	let t1 = 0,
		t2 = 0,
		r1,
		r2;
	try {
		t1 = arg1.toString().split('.')[1].length;
	} catch (e) {}
	try {
		t2 = arg2.toString().split('.')[1].length;
	} catch (e) {}

	r1 = Number(arg1.toString().replace('.', ''));
	r2 = Number(arg2.toString().replace('.', ''));
	return (r1 / r2) * Math.pow(10, t2 - t1);
};

/**
 * 浮点数计算 取模
 * @param {*} arg1
 * @param {*} arg2
 * @param {*} opts
 */
const mod = (arg1: CalcParam, arg2: CalcParam): number => {
	let t1 = 0,
		t2 = 0;
	try {
		t1 = arg1.toString().split('.')[1].length;
	} catch (e) {}
	try {
		t2 = arg2.toString().split('.')[1].length;
	} catch (e) {}
	let multiple = 10 ** Math.max(t1, t2);

	return ((+arg1 * multiple) % (+arg2 * multiple)) / multiple;
};

/**
 * 针对以上加减乘除
 * 支持链式调用
 * (new CalcManager(1)).add(1).add(2).val()
 * class -> babel
 */
class CalcManager {
	private result: CalcParam;
	constructor(val) {
		this.result = val;
	}
	add(val: CalcParam): CalcManager {
		this.result = add(this.result, val);
		return this;
	}
	sub(val: CalcParam, isExchange: boolean): CalcManager {
		this.result = isExchange ? sub(val, this.result) : sub(this.result, val);
		return this;
	}
	mul(val: CalcParam): CalcManager {
		this.result = mul(this.result, val);
		return this;
	}
	div(val: CalcParam, isExchange: boolean): CalcManager {
		this.result = isExchange ? div(val, this.result) : div(this.result, val);
		return this;
	}
	mod(val: CalcParam, isExchange: boolean): CalcManager {
		this.result = isExchange ? mod(val, this.result) : mod(this.result, val);
		return this;
	}
	extend(fn: ExtendFunction, ...restOfName: string[]) {
		if (typeof fn === 'function') {
			this.result = fn(this.result, ...restOfName);
		}
		return this;
	}
	val(): number {
		return Number(this.result || 0);
	}
}

// Calc(1).add(1).val();
export const Calc = (v: CalcParam): CalcManager => new CalcManager(v);
