export function formatCreationDate(date: string): string {
	if (!date || typeof date !== 'string') {
		return 'Date unknown';
	}
	const [day, month, year] = date.split('/');

	const formatedDay = day.padStart(2, '0');
	const formatedMonth = month.padStart(2, '0');

	return `${formatedDay}.${formatedMonth}.${year}`;
}
