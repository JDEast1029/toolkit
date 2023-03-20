const CHALK_FLAG = '$chalk';
type ChalkResult = [typeof CHALK_FLAG, string, string]; // $chalk 做标记用的，
type CreateStyle = (...param: string[]) => string;
type LogResult = [any[], string[]];

const PRESETS_COLORS = {
	black: '#00000',
	red: '#FF0000',
	green: '#008000',
	yellow: '#FFFF00',
	blue: '#0000FF',
	magenta: '#FF00FF',
	cyan: '#00FFFF',
	white: '#FFFFFF',
};

/**
 * 借鉴了chalk，但chalk的样式是基于ANSI编码: console.log("\033[31mRed Text\033[0m")
 *
 * Log.createChalk('bold', 'font-weight: 900')
 * Log.info(Log.blue.bold('A'))
 * Log.info(Log.blue.underline('A', 'B'))
 * Log.info('asdf', Log.blue('A'), Log.bold('B'), 'asdf')
 * Log.createChalk('image', (imageSrc) => `background-image: ${imageSrc}`); Log.image('https://xxxx')
 */
class LogManage {
	[x: string]: any;
	private styleMap: string[] = [];
	private isClosed: boolean = false;
	styles: string[] = [];

	chalkBuilder(name: string) {
		const that = this;

		const chalkFn = (styleString: string, ...content: string[]): ChalkResult => {
			return [CHALK_FLAG, content.join(' '), styleString];
		};

		return new Proxy(chalkFn, {
			get(target: object, prop: string, receiver?: unknown) {
				that.styles.push(that.styleMap[name]);
				return Reflect.get(target, prop, receiver);
			},
			apply(target: any, ctx: any, args: any[]) {
				that.styles.push(that.styleMap[name]);
				let styleString = that.styles.reduce(
					(pre: string, curStyle: string | CreateStyle, index: number) => {
						if (typeof curStyle === 'string') {
							pre += curStyle;
						} else {
							pre += curStyle.apply(ctx, args);
							args = [];
						}
						if (index < that.styles.length - 1) {
							pre += ';';
						}
						return pre;
					},
					'',
				);
				that.styles = [];
				return Reflect.apply(target, ctx, [styleString, ...args]);
			},
		});
	}

	createChalk(name: string, style: string | CreateStyle) {
		this.styleMap[name] = style;
		this[name] = this.chalkBuilder(name);
		Object.setPrototypeOf(this[name], this);
	}

	createResult(...content: any[]): LogResult {
		let result: LogResult = [[], []];
		for (let i = 0; i < content.length; i++) {
			if (
				Array.isArray(content[i]) &&
				content[i].length === 3 &&
				content[i][0] === CHALK_FLAG
			) {
				const [, message, style] = content[i];
				result[0].push(message);
				result[1].push(style);
			} else {
				result[0].push(content[i]);
				result[1].push('');
			}
		}
		return result;
	}

	close(close: boolean) {
		this.isClosed = close;
	}

	private logFactory(fnName: string, ...content: (string | ChalkResult)[]) {
		if (this.isClosed) return;
		const [message, optionalParams] = this.createResult(...content);
		const result = message.map((it) => `%c${it}`).join(' ');
		console[fnName](result, ...optionalParams);
		return { result, optionalParams };
	}

	info(...content: (string | ChalkResult)[]) {
		return this.logFactory('log', ...content);
	}

	warn(...content: (string | ChalkResult)[]) {
		return this.logFactory('warn', ...content);
	}

	error(...content: (string | ChalkResult)[]) {
		return this.logFactory('error', ...content);
	}
}

const Log = new LogManage();

Object.keys(PRESETS_COLORS).forEach((color) => {
	Log.createChalk(color, `color: ${PRESETS_COLORS[color]}`);
});
Object.keys(PRESETS_COLORS).forEach((color) => {
	Log.createChalk(`${color}Bg`, `background-color: ${PRESETS_COLORS[color]}`);
});

export { Log };
