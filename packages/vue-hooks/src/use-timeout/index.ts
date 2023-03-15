import { onUnmounted } from 'vue';

export const useTimeout = () => {
	let timeIds: number[] = [];

	const setTimeout = (fn: () => void, timeout: number | undefined) => {
		const timeId = window.setTimeout(fn, timeout);
		timeIds.push(timeId);
		return timeId;
	};

	const clearTimeout = (timeId?: number) => {
		if (timeId) {
			window.clearTimeout(timeId);
			timeIds = timeIds.filter((it) => it !== timeId);
		} else {
			timeIds.forEach((id) => {
				window.clearTimeout(id);
			});
			timeIds = [];
		}
	};

	onUnmounted(() => {
		clearTimeout();
	});

	return {
		setTimeout,
		clearTimeout,
	};
};
