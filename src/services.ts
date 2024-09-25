import { CourseCardProps } from './components/Courses/components/CourseCard';
import { AuthorsProps } from './components/Courses/components/CourseForm/CourseForm.types';

export const BASE_URL = 'http://localhost:4000';
export const GET_ALL_COURSES = 'courses/all';
export const COURSES = 'courses';
export const POST_COURSE = 'courses/add';
export const POST_AUTHOR = 'authors/add';
export const GET_ALL_AUTHORS = 'authors/all';
export const GET_USER = 'users/me';
export const LOGOUT = 'logout';

export interface CoursesResponse {
	successful: boolean;
	result: CourseCardProps[];
}

export interface AuthorsResponse {
	successful: boolean;
	result: AuthorsProps[];
}
