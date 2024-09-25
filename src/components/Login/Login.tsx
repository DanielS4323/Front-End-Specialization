import React, { ChangeEvent, FormEvent, useState } from 'react';
import type {
	RegistrationFormData,
	RegistrationFormErrors,
} from '../Registration';
import { validateForm, storage } from '../../helpers/index';
import Button, { ButtonSize } from '../../common/Button/index';
import Input from '../../common/Input/Input';
import styles from '../Registration/Registration.module.css';
import { LoginData, Responses } from './Login.types';
import { Link } from 'react-router-dom';
import loginUser from './Login.query';
import { useDispatch } from 'react-redux';
import { login } from '../../store/user/userSlice';

const Login = () => {
	const [formData, setFormData] = useState<RegistrationFormData>({
		name: 'Blanc',
		email: '',
		password: '',
	});
	const [formErrors, setFormErrors] = useState<RegistrationFormErrors>({});
	const [logInError, setLoginError] = useState(null);
	const dispatch = useDispatch();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
			const newuser: LoginData = {
				email: formData.email,
				password: formData.password,
			};
			loginUser(newuser).then((response) => {
				if (!response.successful) {
					setLoginError(response as Responses);
				} else {
					storage.setToken(response.result);
					dispatch(login({ response }));
					window.location.assign(window.location.origin);
				}
			});
		}
	};
	return (
		<form
			className={styles.form}
			onSubmit={handleSubmitForm}
			id='loginForm'
			name='login'
		>
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
			<Button type='submit' buttonText='Login' size={ButtonSize.extraLarge} />
			{logInError && <h4>{logInError.result}</h4>}
			<p className={styles.redirect}>
				If you don't have an account you may{' '}
				<Link to='/registration'>Registration</Link>
			</p>
		</form>
	);
};

export default Login;
