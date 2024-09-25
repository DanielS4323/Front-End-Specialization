import type { CourseCardProps } from '../CourseCard';

export interface CreateCourseProps {
	handleAddNewCourse: (newCourse: CourseCardProps) => void;
}

export interface CourseErrors {
	title: string;
	duration: number;
	description: string;
}

export interface AuthorsProps {
	id: string;
	name: string;
}
