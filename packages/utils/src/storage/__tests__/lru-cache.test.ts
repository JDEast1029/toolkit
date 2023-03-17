import LRUCache from '../lru-cache';

test('LRUCache capacity should work', () => {
	const lruCache = new LRUCache(2);
	lruCache.put('1', { expireTime: 1 });
	lruCache.put('2', { expireTime: 2 });
	lruCache.put('3', { expireTime: 3 });
	expect(lruCache.get('1')).toBeNull();
});
