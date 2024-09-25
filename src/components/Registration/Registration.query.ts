import { RegistrationFormData } from './Registration.types';

const url = 'http://localhost:4000/register';

export const registerUser = async (newUser: RegistrationFormData) => {
	return await fetch(url, {
		method: 'POST',
		body: JSON.stringify(newUser),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((response) => response.json());
};
