import { Log } from '..';

test('Log returned something', () => {
	expect(Log).toBeDefined();
});

test('Log createChalk should work', () => {
	Log.createChalk('bold', 'font-weight: 900');
	expect(Log.bold('加粗')).toEqual(['$chalk', '加粗', 'font-weight: 900']);
	expect(Log.black.bold('加粗', '黑色')).toEqual([
		'$chalk',
		'加粗 黑色',
		'color: #00000;font-weight: 900',
	]);

	Log.createChalk('image', (imageSrc) => `background-image: ${imageSrc}`);
	expect(Log.image('https://xxxx')).toEqual(['$chalk', '', 'background-image: https://xxxx']);
});

test('Log createResult should work', () => {
	expect(Log.createResult('hello', Log.red('A'), 'world')).toEqual([
		['hello', 'A', 'world'],
		['', 'color: #FF0000', ''],
	]);
});

test('Log level function should work', () => {
	Log.error('11');
	Log.warn('11');
	const { result: result1, optionalParams: optionalParams1 } =
		Log.info('1', Log.blue('A'), Log.bold('B'), '2') || {};
	expect(result1).toBe(`%c1 %cA %cB %c2`);
	expect(optionalParams1).toEqual(['', 'color: #0000FF', 'font-weight: 900', '']);

	const { result: result2, optionalParams: optionalParams2 } = Log.info('1', '2') || {};
	expect(result2).toBe(`%c1 %c2`);
	expect(optionalParams2).toEqual(['', '']);

	const { result: result3, optionalParams: optionalParams3 } = Log.info(Log.bold.blue('A')) || {};
	expect(result3).toBe(`%cA`);
	expect(optionalParams3).toEqual(['font-weight: 900;color: #0000FF']);

	Log.close(true);
	expect(Log.info('')).toBeUndefined();
});
