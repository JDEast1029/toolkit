import { InternalError, RequestError, ServerError, ClientError } from '../error';

// @vitest-environment jsdom
test('new Error should return something', () => {
	expect(new InternalError('error').name).toBe('【@sft/http InternalError】');
	expect(new RequestError('error', null, {}).name).toBe('【@sft/http RequestError】');
	expect(new ServerError('error', null, {}).name).toBe('【@sft/http ServerError】');
	expect(new ClientError('error', null, {}).name).toBe('【@sft/http ClientError】');
});

test('Request Error toJSON should work', () => {
	const error = new ServerError('error', null, {});
	expect(error.toJSON()).toEqual({
		name: '【@sft/http ServerError】',
		message: '服务端错误：error',
		config: {},
		status: 0,
	});
	const clientError = new ClientError('error', { status: 400 } as XMLHttpRequest, {});
	expect(clientError.toJSON()).toEqual({
		name: '【@sft/http ClientError】',
		message: '客户端错误：error',
		config: {},
		status: 400,
	});
});

test('ServerError getStatusMessage should work', () => {
	const error500 = new ServerError(500, null, {});
	expect(error500.message).toBe('服务端错误：[500]服务器内部错误');
	const error501 = new ServerError(501, null, {});
	expect(error501.message).toBe('服务端错误：[501]服务器不支持该请求方法');
	const error502 = new ServerError(502, null, {});
	expect(error502.message).toBe('服务端错误：[502]错误网关');
	const error503 = new ServerError(503, null, {});
	expect(error503.message).toBe('服务端错误：[503]服务不可用');
	const error504 = new ServerError(504, null, {});
	expect(error504.message).toBe('服务端错误：[504]网关超时');
	const error505 = new ServerError(505, null, {});
	expect(error505.message).toBe('服务端错误：[505]服务器不支持请求中使用的 HTTP 版本');
});

test('ClientError getStatusMessage should work', () => {
	const error400 = new ClientError(400, null, {});
	expect(error400.message).toBe('客户端错误：[400]错误的请求');
	const error401 = new ClientError(401, null, {});
	expect(error401.message).toBe('客户端错误：[401]客户端身份未验证');
	const error403 = new ClientError(403, null, {});
	expect(error403.message).toBe('客户端错误：[403]客户端没有访问内容的权限');
	const error404 = new ClientError(404, null, {});
	expect(error404.message).toBe('客户端错误：[404]服务器找不到请求的资源');
	const error405 = new ClientError(405, null, {});
	expect(error405.message).toBe('客户端错误：[405]目标资源支持当前请求方法');
	const error407 = new ClientError(407, null, {});
	expect(error407.message).toBe('客户端错误：[407]身份认证需要代理完成');
	const error408 = new ClientError(408, null, {});
	expect(error408.message).toBe('客户端错误：[408]请求超时');
});
