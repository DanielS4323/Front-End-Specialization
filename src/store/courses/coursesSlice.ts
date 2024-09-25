import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CourseCardProps } from 'src/components/Courses/components/CourseCard';
import { CoursesState } from './types';
import {
	fetchCoursesThunk,
	postCourseThunk,
	deleteCourseThunk,
	updateCourseThunk,
} from './thunk';

const initialState: CoursesState = {
	courses: [],
	loading: false,
	error: '',
};

const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		setCourses: (
			state,
			action: PayloadAction<{ result: CourseCardProps[] }>
		) => {
			state.courses = action.payload.result;
		},
		deleteCourse: (state, action: PayloadAction<{ id: string }>) => {
			const id = action.payload.id;
			state.courses = state.courses.filter((course) => course.id !== id);
		},
		addNewCourse: (
			state,
			action: PayloadAction<{ newCourse: CourseCardProps }>
		) => {
			const newCourse = action.payload.newCourse;
			state.courses.push(newCourse);
		},
		updateCourse: (
			state,
			action: PayloadAction<{ toUpdate: CourseCardProps }>
		) => {
			const toUpdate = action.payload.toUpdate;
			const existingCourse = state.courses.find(
				(course) => course.id === toUpdate.id
			);
			if (existingCourse) {
				Object.assign(existingCourse, toUpdate);
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCoursesThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCoursesThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.courses = action.payload.result;
			})
			.addCase(fetchCoursesThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(postCourseThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(postCourseThunk.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(postCourseThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(deleteCourseThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteCourseThunk.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(deleteCourseThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(updateCourseThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateCourseThunk.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(updateCourseThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { setCourses, deleteCourse, addNewCourse, updateCourse } =
	coursesSlice.actions;

export default coursesSlice;
