import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	AuthorsResponse,
	BASE_URL,
	GET_ALL_AUTHORS,
	POST_AUTHOR,
} from '../../services';
import { AuthorsProps } from 'src/components/Courses/components/CourseForm/CourseForm.types';
import { storage } from '../../helpers/index';
import { addNewAuthor } from './authorsSlice';

export const fetchAuthors = createAsyncThunk<AuthorsProps[]>(
	'authors/fetchAuthors',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${BASE_URL}/${GET_ALL_AUTHORS}`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data: AuthorsResponse = await response.json();
			return data.result;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const postAuthors = createAsyncThunk(
	'authors/postAuthors',
	async (newAuthor: AuthorsProps, { dispatch, rejectWithValue }) => {
		try {
			const response = await fetch(`${BASE_URL}/${POST_AUTHOR}`, {
				method: 'POST',
				body: JSON.stringify(newAuthor),
				headers: {
					Authorization: `${storage.getToken()}`,
					'Content-Type': 'application/json',
				},
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			if (data?.successful) {
				dispatch(addNewAuthor({ newAuthor: data?.result }));
			}
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
