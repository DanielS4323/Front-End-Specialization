import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse } from 'src/components/Login/Login.types';
import { UserState } from './types';
import { fetchUser, logoutUser } from './thunk';

const initialUserState: UserState = {
	isAuth: false,
	isAdmin: false,
	name: '',
	email: '',
	token: '',
	role: '',
	loading: false,
	error: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialUserState,
	reducers: {
		login: (state, action: PayloadAction<{ response: UserResponse }>) => {
			state.isAuth = true;
			state.name = action.payload.response.user.name;
			state.email = action.payload.response.user.email;
			state.token = action.payload.response.result;
		},
		logout: (state) => {
			state.isAuth = false;
			state.name = '';
			state.email = '';
			state.token = '';
			state.role = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.loading = false;
				state.isAuth = true;
				state.isAdmin = action.payload.result.role === 'admin';
				state.name = action.payload.result.name;
				state.email = action.payload.result.email;
				state.role = action.payload.result.role;
				state.token = action.payload.result.token;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(logoutUser.fulfilled, () => initialUserState)
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice;
