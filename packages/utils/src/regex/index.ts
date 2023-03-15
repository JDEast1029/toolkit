import { RegexRule, RegexRuleMap } from './types';
import { RegexRules } from './rules';
import { isEmptyValue } from './utils';

class RegexManage {
	regexRules: RegexRuleMap;

	constructor(regexRules?: RegexRuleMap) {
		this.regexRules = regexRules || {};
	}

	inject(field: string, rule: RegexRule) {
		if (this.regexRules[field]) {
			console.warn('@sh/utile Regex.inject:', `${field}正则已经存在，默认正则会被替换`);
		}
		this.regexRules[field] = rule;
	}

	// name: [{ type: 'mobile', message: 'xxx', validator: Regex.validator }]
	validator(rule, value, callback, source?, options?) {
		const ruleItem = this.regexRules[rule.type];
		if (!ruleItem) return callback();

		if (rule.required && isEmptyValue(value, rule.type)) {
			return callback(rule.message || ruleItem.message);
		} else if (!ruleItem.value.test(value)) {
			return callback(rule.message || ruleItem.message);
		}
		callback();
	}
}

export const Regex = new RegexManage(RegexRules);
