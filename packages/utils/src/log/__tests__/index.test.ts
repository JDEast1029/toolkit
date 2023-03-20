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
	Log.info('11');
	Log.warn('11');
	Log.error('11');
});
