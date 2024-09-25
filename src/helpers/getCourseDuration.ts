export function getCourseDuration(mins: number): string {
	const hours = Math.floor(mins / 60);
	const minutes = mins % 60;

	const formattedHours = hours < 10 ? '0' + hours : hours;
	const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
	const hourLabel = hours === 1 ? 'hour' : 'hours';

	return `${formattedHours}:${formattedMinutes} ${hourLabel}`;
}
