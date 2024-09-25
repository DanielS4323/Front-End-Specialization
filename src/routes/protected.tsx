import React from 'react';
import Courses from '../components/Courses/Courses';
import CourseInfo from '../components/CourseInfo/CourseInfo';
import CourseForm from '../components/Courses/components/CourseForm/CourseForm';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

export const protectedRoutes = [
	{ path: '/courses', element: <Courses /> },
	{ path: '/courses/:id', element: <CourseInfo /> },
	{
		path: '/courses/add',
		element: (
			<PrivateRoute>
				<CourseForm />
			</PrivateRoute>
		),
	},
	{
		path: '/courses/update/:id',
		element: (
			<PrivateRoute>
				<CourseForm />
			</PrivateRoute>
		),
	},
];
