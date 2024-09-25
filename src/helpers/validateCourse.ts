export function validateCourse({ title, description, duration }: T): T {
	const errors: T = {};

	if (!title || title.length < 2) {
		errors.title = 'Text length should be at least 2 characters';
	}

	if (!description || description.length < 2) {
		errors.description =
			'Description text length should be at least 2 characters';
	}
	if (!duration || isNaN(duration)) {
		errors.duration = 'Duration is required and it must be a number';
	} else if (duration < 1) {
		errors.duration = 'Duration should be more than 0 minutes';
	}

	return errors;
}
