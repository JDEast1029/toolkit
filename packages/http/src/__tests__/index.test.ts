import { createRequest } from '..';

// @vitest-environment jsdom
test('createRequest not return something', () => {
	expect(createRequest()).toBeDefined();
});

const client = createRequest({
	baseUrl: 'http://localhost:3000',
	headers: { token: '1' },
	onUploadProgress: (event) => {},
	onDownloadProgress: (event) => {},
});

client.interceptors.response.use((response) => {
	return {
		status: 1,
		msg: '请求成功',
		data: JSON.parse(response.data),
	};
});

test('request get should work', async () => {
	await client
		.request({ url: '/gets', params: { id: 1 } })
		.then((res) => {
			expect(res).toEqual({
				status: 1,
				msg: '请求成功',
				data: [{ id: 1, title: 'json-server', author: 'typicode' }],
			});
		})
		.catch((error) => {
			console.log('error', error);
		});
});

test('request get with string params should work', async () => {
	await client
		.request({
			url: '/gets',
			params: 'id=2',
		})
		.then((res) => {
			expect(res).toEqual({
				status: 1,
				msg: '请求成功',
				data: [{ id: 2, title: 'json-server', author: 'typicode' }],
			});
		})
		.catch((error) => {
			console.log('error', error);
		});
});

test('request 40x should work', async () => {
	await client.request({ url: '/404' }).catch((error) => {
		expect(error.message).toBe('客户端错误：[404]服务器找不到请求的资源');
	});
});

// test('request put should work', async () => {
// 	await client
// 		.request({
// 			url: '/posts',
// 			method: 'POST',
// 			params: { id: 1 },
// 		})
// 		.then((res) => {});
// });

test('request invalid method or url should catch error', async () => {
	await client
		.request({
			url: '/posts',
			baseUrl: 'not.parsed.url',
		})
		.catch((error) => {
			expect(error.message).toBe('客户端错误：TypeError: Invalid base URL: not.parsed.url');
		});
});

test('request abort should work', () => {
	const controller = new AbortController();
	client
		.request({
			url: '/gets',
			params: 'id=2',
			signal: controller.signal,
		})
		.catch((error) => {
			expect(error.message).toBe('请求被终止');
		});
	setTimeout(() => {
		controller.abort();
	}, 0);
});
