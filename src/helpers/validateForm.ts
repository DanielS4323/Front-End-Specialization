export function validateForm({ name, email, password }: T): T {
	const errors: T = {};

	if (!name) {
		errors.name = 'Name is required';
	}

	if (!email) {
		errors.email = 'Email is required';
	} else if (!/\S+@\S+\.\S+/.test(email)) {
		errors.email = 'Email address is invalid';
	}

	if (!password) {
		errors.password = 'Password is required';
	} else if (password.trim().length === 0) {
		errors.password = 'Password cannot contain blanc space.';
	}

	return errors;
}
