import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isRoleAdmin } from '../../store/user/selectors';
import { PrivateRouteProps } from './PrivateRoute.types';

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const isAdmin = useSelector(isRoleAdmin);
	if (isAdmin) {
		return <>{children}</>;
	}
	return <Navigate to='/' />;
};

export default PrivateRoute;
