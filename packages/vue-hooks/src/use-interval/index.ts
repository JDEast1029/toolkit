import { onUnmounted } from 'vue';

export const useInterval = () => {
	let timeIds: number[] = [];

	const setInterval = (fn: () => void, timeout: number | undefined) => {
		const timeId = window.setInterval(fn, timeout);
		timeIds.push(timeId);
		return timeId;
	};

	const clearInterval = (timeId?: number) => {
		if (timeId) {
			window.clearInterval(timeId);
			timeIds = timeIds.filter((it) => it !== timeId);
		} else {
			timeIds.forEach((id) => {
				window.clearInterval(id);
			});
			timeIds = [];
		}
	};

	onUnmounted(() => {
		clearInterval();
	});

	return {
		setInterval,
		clearInterval,
	};
};
