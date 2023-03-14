export type RegexRule = {
	value: RegExp;
	message: string;
};
export type RegexRuleMap = {
	[key: string]: RegexRule;
};
