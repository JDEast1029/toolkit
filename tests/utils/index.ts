export const sleep = (time) =>
	new Promise((r) => {
		setTimeout(() => {
			r(1);
		}, time);
	});
