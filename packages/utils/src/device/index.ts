import { ResetOptions } from './types';

const IS_SERVER = typeof window === 'undefined';

class DeviceManager {
	ios: boolean = false;
	android: boolean = false;
	iphone: boolean = false;
	ipad: boolean = false;
	androidChrome: boolean = false;

	os: string = '';
	osVersion: string | null = '';

	wechat: boolean = false;
	wechatDevTools: boolean = false;
	wechatVersion: string = '';

	webView: boolean | null = null;
	touch: boolean = false;

	firefox: boolean = false;

	constructor() {
		this.reset();
	}

	private restoreDefault() {
		this.ios = false;
		this.android = false;
		this.iphone = false;
		this.ipad = false;
		this.androidChrome = false;

		this.os = '';
		this.osVersion = '';

		this.wechat = false;
		this.wechatDevTools = false;
		this.wechatVersion = '';

		this.webView = null;
		this.touch = false;

		this.firefox = false;
	}

	reset(opts?: ResetOptions) {
		this.restoreDefault();

		const ua =
			IS_SERVER || opts
				? (<ResetOptions>opts)?.userAgent || navigator.userAgent
				: navigator.userAgent;

		const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
		const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
		const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
		const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

		// Android
		if (android) {
			this.os = 'android';
			this.osVersion = android[2];
			this.android = true;
			this.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
		}
		if (ipad || iphone || ipod) {
			this.os = 'ios';
			this.ios = true;
		}
		// iOS
		if (iphone && !ipod) {
			this.osVersion = iphone[2].replace(/_/g, '.');
			this.iphone = true;
		}
		if (ipad) {
			this.osVersion = ipad[2].replace(/_/g, '.');
			this.ipad = true;
		}
		if (ipod) {
			this.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
			this.iphone = true;
		}

		// Webview
		this.webView = (iphone || ipad || ipod) && /.*AppleWebKit(?!.*Safari)/i.test(ua);

		// wechat
		this.wechat = /MicroMessenger/i.test(ua);
		this.wechatVersion = (ua.match(/MicroMessenger\/([\d\.]+)/i) || [])[1];
		// wechatDevTools
		this.wechatDevTools = /wechatdevtools/.test(ua);

		// pc or touch
		this.touch = this.android || this.ios ? true : false;

		// firefox
		this.firefox = ua.toLowerCase().indexOf('firefox') > -1;

		return this;
	}
}
export const Device = new DeviceManager();
