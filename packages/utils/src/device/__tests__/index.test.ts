import { Device } from '..';

// @vitest-environment happy-dom
test('Device returned something', () => {
	expect(Device).toBeDefined();
});

const fieldList: string[] = [
	'ios',
	'android',
	'iphone',
	'ipad',
	'androidChrome',
	'os',
	'osVersion',
	'wechat',
	'wechatDevTools',
	'wechatVersion',
	'webView',
	'touch',
	'firefox',
];
const pick = (obj) => {
	return Object.keys(obj).reduce((pre, field) => {
		if (fieldList.includes(field)) {
			pre[field] = obj[field];
		}
		return pre;
	}, {});
};
test('Device reset should word', async () => {
	expect(Device.reset({ userAgent: navigator.userAgent }).touch).toBeFalsy();
	expect(Device.reset({ userAgent: '' }).touch).toBeFalsy();
	// android机
	let result = Device.reset({
		userAgent:
			'Mozilla/5.0 (Linux; Android 13; V2231A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.141 Mobile Safari/537.36 VivoBrowser/13.6.21.0',
	});
	expect(pick(result)).toEqual({
		ios: false,
		android: true,
		iphone: false,
		ipad: false,
		androidChrome: true,
		os: 'android',
		osVersion: '13',
		wechat: false,
		wechatDevTools: false,
		wechatVersion: undefined,
		webView: null,
		touch: true,
		firefox: false,
	});
	await new Promise((r) => {
		setTimeout(() => {
			r(1);
		}, 1000);
	});
	// iphone
	result = Device.reset({
		userAgent:
			'Mozilla/5.0 (iPhone_ CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 matrixstyle/1 SP-engine/2.55.0 main/1.0 bdapp/1.0 (tomas; tomas) tomas/1.46.0.11 (Baidu; P2 16.2) NABar/1.0 themeUA_Theme/default',
	});
	expect(pick(result)).toEqual({
		ios: true,
		android: false,
		iphone: true,
		ipad: false,
		androidChrome: false,
		os: 'ios',
		osVersion: '16.2',
		wechat: false,
		wechatDevTools: false,
		wechatVersion: undefined,
		webView: true,
		touch: true,
		firefox: false,
	});
	// ipad
	result = Device.reset({
		userAgent:
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Mozilla/5.0 (iPad; CPU OS 13_2_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MQBHD/6.9.4 Safari/537.22',
	});
	expect(pick(result)).toEqual({
		android: false,
		androidChrome: false,
		firefox: false,
		ios: true,
		ipad: true,
		iphone: false,
		os: 'ios',
		osVersion: '13.2.2',
		touch: true,
		webView: false,
		wechat: false,
		wechatDevTools: false,
		wechatVersion: undefined,
	});

	// ipod
	result = Device.reset({
		userAgent:
			'Mozilla/5.0 (iPod touch; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.0 Mobile/14F89 Safari/602.1',
	});
	expect(pick(result)).toEqual({
		android: false,
		androidChrome: false,
		firefox: false,
		ios: true,
		ipad: false,
		iphone: true,
		os: 'ios',
		osVersion: '10.3.2',
		touch: true,
		webView: false,
		wechat: false,
		wechatDevTools: false,
		wechatVersion: undefined,
	});
});
