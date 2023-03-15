import { ref } from 'vue';

/**
 *
 * @param minDate 最小日期 '2023-03-15' || '2023-03-15 11:11:11'
 * @returns
 */
export const useDisableDate = (minDate?: string) => {
	const dateOptions = ref({
		disabledDate(date) {
			return (
				date &&
				date.valueOf() < new Date(minDate || new Date().toLocaleDateString()).getTime()
			);
		},
	});

	const timePickerOptions = ref({
		disabledTime(date) {
			return date.getTime() < (new Date(minDate || '').getTime() || Date.now());
		},
	});
	return {
		dateOptions,
		timePickerOptions,
	};
};
