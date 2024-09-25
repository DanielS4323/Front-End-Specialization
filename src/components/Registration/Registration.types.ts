export interface RegistrationFormData {
	name: string;
	email: string;
	password: string;
}

export interface RegistrationFormErrors {
	name?: string;
	email?: string;
	password?: string;
}
