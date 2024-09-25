export interface UserState {
	isAuth: boolean;
	isAdmin: boolean;
	name: string;
	email: string;
	token: string;
	role: string;
	loading: boolean;
	error: unknown;
}
