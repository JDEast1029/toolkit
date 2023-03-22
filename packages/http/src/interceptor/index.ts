import { Interceptor } from './types';

export class InterceptorManage {
	interceptors: Interceptor[] = [];

	off(interceptor: Interceptor) {
		const index = this.interceptors.findIndex((it) => it === interceptor);
		if (index === -1) return;
		this.interceptors.splice(index, 1);
		return this;
	}

	// 按注册顺序(队尾push)加入拦截器
	use(interceptor: Interceptor) {
		this.interceptors.push(interceptor);
	}

	// 从队首插入拦截器
	useAtFirst(interceptor: Interceptor) {
		this.interceptors.unshift(interceptor);
	}

	// 只拦截一次，成功or失败后取消掉
	useOnce(interceptor: Interceptor) {
		const onceInterceptor = async (params) => {
			const result = await interceptor(params).finally(() => this.off(onceInterceptor));
			return result;
		};
		this.use(onceInterceptor);
	}

	// 覆盖当前的拦截器，成功or失败后还原
	useOverride(interceptor: Interceptor) {
		const originInterceptors = this.interceptors;
		const overrideInterceptor = async (params) => {
			const result = await interceptor(params).finally(
				() => (this.interceptors = originInterceptors),
			);
			return result;
		};
		this.interceptors = [];
		this.useOnce(overrideInterceptor);
	}
}
