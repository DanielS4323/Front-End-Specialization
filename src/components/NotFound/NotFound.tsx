import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserIsAuth } from '../../store/user/selectors';
const NotFound = () => {
	const userIsAuth = useSelector(getUserIsAuth);

	if (userIsAuth) {
		return <Navigate replace to='/' />;
	} else {
		return <Navigate replace to='/login' />;
	}
};

export default NotFound;
