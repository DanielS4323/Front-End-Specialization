import { AuthorsProps } from 'src/components/Courses/components/CourseForm/CourseForm.types';

export function getAuthorName(
	authorsIds: string[],
	authorsList: AuthorsProps[]
) {
	return authorsIds.map((id) => {
		const author = authorsList?.find((author) => author.id === id);
		return author ? author.name : 'Unknown Author';
	});
}
