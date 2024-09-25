import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorsState } from './types';
import { AuthorsProps } from 'src/components/Courses/components/CourseForm/CourseForm.types';
import { fetchAuthors, postAuthors } from './thunk';

const initialState: AuthorsState = {
	authorsList: [],
	loading: false,
	error: '',
};

const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {
		setAuthors: (state, action: PayloadAction<{ result: AuthorsProps[] }>) => {
			state.authorsList = action.payload.result;
		},
		addNewAuthor: (
			state,
			action: PayloadAction<{ newAuthor: AuthorsProps }>
		) => {
			const newAuthor = action.payload.newAuthor;
			state.authorsList.push(newAuthor);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAuthors.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchAuthors.fulfilled, (state, action) => {
				state.loading = false;
				state.authorsList = action.payload;
				state.error = null;
			})
			.addCase(fetchAuthors.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(postAuthors.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(postAuthors.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(postAuthors.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { setAuthors, addNewAuthor } = authorsSlice.actions;

export default authorsSlice;
