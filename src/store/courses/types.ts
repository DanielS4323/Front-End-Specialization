import { CourseCardProps } from 'src/components/Courses/components/CourseCard';

export interface CoursesState {
	courses: CourseCardProps[];
	loading: boolean;
	error: unknown;
}
