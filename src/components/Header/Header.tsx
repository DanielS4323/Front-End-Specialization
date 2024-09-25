import React from 'react';
import Logo from './components/Logo/Logo';
import styles from './Header.module.css';
import Button, { ButtonSize } from '../../common/Button/index';
import { storage } from '../../helpers/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserIsAuth, getUserName } from '../../store/user/selectors';
import { logoutUser } from '../../store/user/thunk';
import { AppDispatch } from 'src/store/rootReducer';

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { pathname } = useLocation();
	const userIsAuth = useSelector(getUserIsAuth);
	const userName = useSelector(getUserName) || 'Admin';
	function handleLogOut() {
		dispatch(logoutUser());
		storage.clearToken();
		navigate('/login', { replace: true });
	}
	const ifPathName = pathname === '/login' || pathname === '/registration';

	return (
		<header className={styles.header}>
			<Logo />
			{userIsAuth && (
				<div style={{ display: 'flex', gap: '20px' }}>
					<p>{userName}</p>
					<Button
						buttonText='Logout'
						size={ButtonSize.small}
						onClick={handleLogOut}
						type='button'
					/>
				</div>
			)}
			{!ifPathName && !userIsAuth && (
				<Button
					buttonText='Login'
					size={ButtonSize.small}
					onClick={() => navigate('/login')}
					type='button'
				/>
			)}
		</header>
	);
};

export default Header;
