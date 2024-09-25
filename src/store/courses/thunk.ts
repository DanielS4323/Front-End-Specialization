import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	BASE_URL,
	COURSES,
	CoursesResponse,
	GET_ALL_COURSES,
	POST_COURSE,
} from '../../services';
import { CourseCardProps } from 'src/components/Courses/components/CourseCard';
import { storage } from '../../helpers/index';
import { addNewCourse, deleteCourse, updateCourse } from './coursesSlice';

export const fetchCoursesThunk = createAsyncThunk<CoursesResponse>(
	'courses/fetchCourses',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${BASE_URL}/${GET_ALL_COURSES}`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data: CoursesResponse = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const postCourseThunk = createAsyncThunk(
	'courses/postCourse',
	async (newCourse: CourseCardProps, { dispatch, rejectWithValue }) => {
		try {
			const response = await fetch(`${BASE_URL}/${POST_COURSE}`, {
				method: 'POST',
				body: JSON.stringify(newCourse),
				headers: {
					Authorization: `${storage.getToken()}`,
					'Content-Type': 'application/json',
				},
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			dispatch(addNewCourse({ newCourse: data?.result }));
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const updateCourseThunk = createAsyncThunk(
	'courses/updateCourse',
	async (newCourse: CourseCardProps, { dispatch, rejectWithValue }) => {
		try {
			const response = await fetch(`${BASE_URL}/${COURSES}/${newCourse.id}`, {
				method: 'PUT',
				body: JSON.stringify(newCourse),
				headers: {
					Authorization: `${storage.getToken()}`,
					'Content-Type': 'application/json',
				},
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			dispatch(updateCourse({ toUpdate: data?.result }));
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const deleteCourseThunk = createAsyncThunk(
	'courses/deleteCourseThunk',
	async (id: string, { dispatch, rejectWithValue }) => {
		try {
			const response = await fetch(`${BASE_URL}/${COURSES}/${id}`, {
				method: 'DELETE',
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
				dispatch(deleteCourse({ id }));
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
