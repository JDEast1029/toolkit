export type TreeNode = {
	label: string;
	value: unknown;
	children?: TreeNode[];
	[key: string]: unknown;
};
