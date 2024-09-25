import React from 'react';
import Login from '../components/Login/Login';
import Registration from '../components/Registration';

export const publicRoutes = [
	{ path: '/login', element: <Login /> },
	{ path: '/registration', element: <Registration /> },
];
