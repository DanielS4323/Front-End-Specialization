import { AuthorsProps } from 'src/components/Courses/components/CourseForm/CourseForm.types';

export interface AuthorsState {
	authorsList: AuthorsProps[];
	loading: boolean;
	error: unknown;
}
