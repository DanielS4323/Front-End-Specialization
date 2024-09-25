import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import coursesSlice from './courses/coursesSlice';
import authorsSlice from './authors/authorsSlice';
import store from '.';

const rootReducer = combineReducers({
	user: userSlice.reducer,
	courses: coursesSlice.reducer,
	authors: authorsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default rootReducer;
