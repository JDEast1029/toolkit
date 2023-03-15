import { Calc } from '..';

test('Calc returned something', () => {
	expect(Calc(1)).toBeDefined();
});

const extendFn = (value1, value2) => {
	return value1 + value2;
};

test('Calc add should work', () => {
	// add
	expect(Calc(0.1).add(0.2).val()).toBe(0.3);
	expect(Calc(0).add(0).val()).toBe(0);
	expect(Calc(1.01).add(0.2).val()).toBe(1.21);
	expect(Calc(1.2).add(0.01).val()).toBe(1.21);

	// sub
	expect(Calc(0).sub(0.1).val()).toBe(-0.1);
	expect(Calc(2.1).sub(1).val()).toBe(1.1);
	expect(Calc(2.1).sub(1, true).val()).toBe(-1.1);
	expect(Calc(0.8).sub(0.6).val()).toBe(0.2);

	// mul
	expect(Calc(0).mul(0).val()).toBe(0);
	expect(Calc(100).mul(99).val()).toBe(9900);

	// div
	expect(Calc(0).div(1).val()).toBe(0);
	expect(Calc(0).div(1, true).val()).toBe(Infinity);
	expect(Calc(1).div(0).val()).toBe(Infinity);

	// mod
	expect(Calc(20).mod(6).val()).toBe(2);
	expect(Calc(20).mod(6, true).val()).toBe(6);

	// extend
	expect(Calc(20).extend(extendFn, 20, 10).val()).toBe(50);
});
