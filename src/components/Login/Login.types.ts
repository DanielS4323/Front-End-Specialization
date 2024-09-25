export interface LoginData {
	email: string;
	password: string;
}
export interface Responses {
	successful: boolean;
	result: string;
}

export interface UserProps {
	user: {
		name: string;
		email: string;
	};
}

export interface UserResponse extends Responses, UserProps {}
