import HttpRequest from './request';

/**
 * Features
 * 设置请求头
 * 参数
 * 拦截器(请求 | 响应)：可全局注册，单个请求中可以全局的覆盖，也可以在指定位置插入
 * 响应结果自定义，全局设置，响应的拦截器接收的参数以该自定义结果为准
 * 错误上下文打印
 * 取消请求
 *
 * 用法
 * const instance = createRequest({
 * 	baseUrl: '',
 * })
 * instance.request({
 * 	url: '',
 * 	params: {},
 * 	data: {}
 * }).then((res) => {}, (error) => {})
 */
export const createRequest = (config?: object) => {
	return new HttpRequest(config);
};
