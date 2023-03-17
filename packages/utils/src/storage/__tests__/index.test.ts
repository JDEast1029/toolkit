import { sleep } from '@tests-utils';
import { LocalStorage, SessionStorage } from '..';
import './lru-cache.test';
import './linked-list.test';

// @vitest-environment happy-dom
test('LocalStorage & SessionStorage returned something', () => {
	expect(LocalStorage).toBeDefined();
	expect(SessionStorage).toBeDefined();
});

test('length filed should work', () => {
	expect(LocalStorage.length).toBe(0);

	LocalStorage.clear();
	LocalStorage.set('length', 1);
	expect(LocalStorage.length).toBe(1);
});

test('key function should word', () => {
	LocalStorage.clear();
	LocalStorage.set('l-key', 1);
	expect(LocalStorage.key(0)).toBe('@sft/utils@1.0.0:l-key');
});

test('ownKeys function should word', () => {
	LocalStorage.clear();
	LocalStorage.set('l-ownKeys', 1);
	expect(LocalStorage.ownKeys()).toEqual(['@sft/utils@1.0.0:l-ownKeys']);
});

test('setPrefix function should work', () => {
	LocalStorage.clear();
	LocalStorage.setPrefix('prefix');
	LocalStorage.set('l-setPrefix', 1);
	expect(LocalStorage.ownKeys()).toEqual(['prefix@1.0.0:l-setPrefix']);

	SessionStorage.clear();
	SessionStorage.setPrefix('prefix');
	SessionStorage.set('s-setPrefix', 1);
	expect(SessionStorage.ownKeys()).toEqual(['prefix@1.0.0:s-setPrefix']);

	LocalStorage.setPrefix('@sft/utils');
});

test('setVersion function should work', () => {
	LocalStorage.clear();
	LocalStorage.setPrefix('@sft/utils');
	LocalStorage.setVersion('1.0.0');
	LocalStorage.setVersion('1.0.1');
	LocalStorage.set('l-setVersion', 1);
	expect(LocalStorage.ownKeys()).toEqual(['@sft/utils@1.0.1:l-setVersion']);

	LocalStorage.setVersion('1.0.0');
});

test('set function should work', async () => {
	LocalStorage.clear();
	LocalStorage.set('l-set', 1, {});
	expect(LocalStorage.get('l-set')).toEqual(1);

	// expireTime
	LocalStorage.set('l-set', 1, { expireTime: new Date().getTime() });
	await sleep(1000);
	expect(LocalStorage.get('l-set')).toBeNull();
});

test('get function should work', async () => {
	LocalStorage.clear();
	expect(LocalStorage.get('l-set')).toBeNull();

	LocalStorage.set('l-set', 1, { expireTime: new Date().getTime() });

	await sleep(1000);
	expect(LocalStorage.get('l-set')).toBeNull();
});

test('remove function should work', () => {
	LocalStorage.clear();

	LocalStorage.set('l-set', 1);
	LocalStorage.remove('l-set');
	expect(LocalStorage.get('l-set')).toBeNull();
});

test('clearOwnKeys function should work', () => {
	LocalStorage.clear();

	localStorage.setItem('origin', '111');
	LocalStorage.set('l-set', 1);
	LocalStorage.clearOwnKeys();
	expect(LocalStorage.length).toBe(1);
});

test('clearPrevVersion function should work', () => {
	LocalStorage.clear();

	LocalStorage.set('version1', 1);
	LocalStorage.set('version2', 2);
	LocalStorage.setVersion('1.0.3');
	expect(LocalStorage.length).toBe(0);

	LocalStorage.setVersion('1.0.0');
});

test('lruCache should work', () => {
	LocalStorage.clear();

	const originLocalStorage = window.localStorage;
	Reflect.deleteProperty(window, 'localStorage');
	LocalStorage.set('lruCache', '1');
	window.localStorage = originLocalStorage;

	expect(LocalStorage.get('lruCache')).toBe('1');
});
