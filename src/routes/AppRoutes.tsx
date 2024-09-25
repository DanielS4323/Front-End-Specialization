import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import NotFound from '../components/NotFound/NotFound';
import { useSelector } from 'react-redux';
import { getUserIsAuth } from '../store/user/selectors';

export const AppRoutes = () => {
	const userIsAuth = useSelector(getUserIsAuth);
	const commonRoutes = [
		{ path: '/', element: <Navigate replace to='/courses' /> },
		{ path: '*', element: <NotFound /> },
	];
	const routes = userIsAuth ? protectedRoutes : publicRoutes;
	const element = useRoutes([...routes, ...commonRoutes]);
	return <>{element}</>;
};
