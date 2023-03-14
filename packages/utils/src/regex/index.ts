import { RegexRule, RegexRuleMap } from './types';
import { RegexRules } from './rules';

class RegexManage {
	regexRules: RegexRuleMap;

	constructor(regexRules?: RegexRuleMap) {
		this.regexRules = regexRules || {};
	}

	inject(field: string, rule: RegexRule) {}

	validator(rule, value, callback) {}
}

export const Regex = new RegexManage(RegexRules);
