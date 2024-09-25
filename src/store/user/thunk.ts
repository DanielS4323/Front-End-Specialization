import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, GET_USER, LOGOUT } from '../../services';
import { storage } from '../../helpers/index';

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async (token: string, { rejectWithValue }) => {
		try {
			const response = await fetch(`${BASE_URL}/${GET_USER}`, {
				headers: {
					Authorization: `${token}`,
				},
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const logoutUser = createAsyncThunk(
	'user/logoutUser',
	async (_, { rejectWithValue }) => {
		try {
			const token = storage.getToken();
			await fetch(`${BASE_URL}/${LOGOUT}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `${token}`,
				},
			});
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
