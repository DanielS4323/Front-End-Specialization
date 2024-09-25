import React, { useState, FormEvent } from 'react';
import Button, { ButtonSize } from '../../common/Button/index';
import Input from '../../common/Input/Input';
import {
	type RegistrationFormData,
	type RegistrationFormErrors,
	registerUser,
	styles,
} from './index';
import { validateForm } from '../../helpers/index';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<RegistrationFormData>({
		name: '',
		email: '',
		password: '',
	});

	const [formErrors, setFormErrors] = useState<RegistrationFormErrors>({});
	const [responseError, setResponseError] = useState(null);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmitForm = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const errors = validateForm(formData);
		setFormErrors(errors);
		if (Object.keys(errors).length === 0) {
			const newuser: RegistrationFormData = {
				name: formData.name,
				password: formData.password,
				email: formData.email,
			};
			registerUser(newuser)
				.then((res: { successful: boolean; result: string }) => {
					if (res.successful) {
						navigate('/login');
					} else {
						setResponseError(res);
					}
				})
				.catch((err) => {
					throw new Error(`Error: ${err}`);
				});
		}
	};

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmitForm}
			id='registerForm'
			name='register'
		>
			<Input
				label='name'
				type='text'
				name='name'
				value={formData.name}
				onChange={handleChange}
			/>
			{formErrors.name && (
				<span className={styles.error}>{formErrors.name}</span>
			)}
			<Input
				label='email'
				type='email'
				name='email'
				value={formData.email}
				onChange={handleChange}
			/>
			{formErrors.email && (
				<span className={styles.error}>{formErrors.email}</span>
			)}
			<Input
				label='password'
				type='password'
				name='password'
				value={formData.password}
				onChange={handleChange}
			/>
			{formErrors.password && (
				<span className={styles.error}>{formErrors.password}</span>
			)}
			<Button
				type='submit'
				buttonText='Register'
				size={ButtonSize.extraLarge}
			/>
			{responseError && (
				<h4 style={{ color: 'red' }}>{responseError?.errors[0]}</h4>
			)}
			<p className={styles.redirect}>
				If you have an account you may <Link to='/login'>Login</Link>
			</p>
		</form>
	);
};

export default Registration;
