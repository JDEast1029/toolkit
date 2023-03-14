class RegexManage {
	regexList: never[];

	constructor() {
		this.regexList = [];
	}

	inject() {}

	validator(rule, value, callback) {}
}

export const Regex = new RegexManage();
