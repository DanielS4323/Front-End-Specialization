import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import { AppRoutes } from './routes/AppRoutes';
import { useDispatch } from 'react-redux';
import { fetchCoursesThunk } from './store/courses/thunk';
import { AppDispatch } from './store/rootReducer';
import { fetchAuthors } from './store/authors/thunk';
import { fetchUser } from './store/user/thunk';
import { storage } from './helpers/index';
import { ErrorBoundary } from 'react-error-boundary';
import NotFound from './components/NotFound/NotFound';

function App() {
	const token: string = storage.getToken();
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		if (token) {
			dispatch(fetchUser(token));
		}
	}, [dispatch, token]);

	useEffect(() => {
		dispatch(fetchCoursesThunk());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchAuthors());
	}, [dispatch]);

	return (
		<ErrorBoundary fallback={<NotFound />}>
			<Header />
			<AppRoutes />
		</ErrorBoundary>
	);
}

export default App;
