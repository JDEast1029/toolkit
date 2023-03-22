import { RequestConfig } from './types';

export class InternalError extends Error {
	constructor(message) {
		super(message);
		this.name = '【@sft/http InternalError】';
	}
}

export class RequestError extends Error {
	request: XMLHttpRequest | null;
	config: RequestConfig;

	constructor(message: string, request: XMLHttpRequest | null, config: RequestConfig) {
		super(message);
		this.name = '【@sft/http RequestError】';
		this.request = request;
		this.config = config;
	}

	toJSON() {
		return {
			name: this.name,
			message: this.message,
			config: this.config,
			status: this.request ? this.request.status : 0, // 在请求完成前或者请求出错，浏览器返回的status也为0，这里默认0
		};
	}
}

export class ServerError extends RequestError {
	constructor(status: number | string, request: XMLHttpRequest | null, config: RequestConfig) {
		super('', request, config);
		this.name = '【@sft/http ServerError】';
		this.message = `服务端错误：${this.getStatusMessage(status)}`;
	}

	getStatusMessage(status: number | string): string {
		switch (status) {
			case 500:
				return '[500]服务器内部错误';
			case 501:
				return '[501]服务器不支持该请求方法';
			case 502:
				return '[502]错误网关';
			case 503:
				return '[503]服务不可用';
			case 504:
				return '[504]网关超时';
			case 505:
				return '[505]服务器不支持请求中使用的 HTTP 版本';
			default:
				return `${status}`;
		}
	}
}

export class ClientError extends RequestError {
	constructor(status: number | string, request: XMLHttpRequest | null, config: RequestConfig) {
		super('', request, config);
		this.name = '【@sft/http ClientError】';
		this.message = `客户端错误：${this.getStatusMessage(status)}`;
	}

	getStatusMessage(status: number | string): string {
		switch (status) {
			case 400:
				return '[400]错误的请求';
			case 401:
				return '[401]客户端身份未验证';
			case 403:
				return '[403]客户端没有访问内容的权限';
			case 404:
				return '[404]服务器找不到请求的资源';
			case 405:
				return '[405]目标资源支持当前请求方法';
			case 407:
				return '[407]身份认证需要代理完成';
			case 408:
				return '[408]请求超时';
			default:
				return `${status}`;
		}
	}
}
