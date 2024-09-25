import type { UserResponse } from './Login.types';

const url = 'http://localhost:4000/login';

const loginUser = async (user: {
	email: string;
	password: string;
}): Promise<UserResponse> => {
	return await fetch(url, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((response) => response.json());
};

export default loginUser;
