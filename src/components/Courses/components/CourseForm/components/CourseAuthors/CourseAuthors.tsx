import React from 'react';
import { CourseAuthorsProps } from './CourseAuthors.types';
import Button, { ButtonSize } from '../../../../../../common/Button/index';
import styles from '../AuthorList/AuthorsList.module.css';
import { getAuthorName } from '../../../../../../helpers/index';
import { useSelector } from 'react-redux';
import { getAuthors } from '../../../../../../store/authors/selectors';
const CourseAuthors = ({
	courseAuthors,
	removeCourseAuthor,
}: CourseAuthorsProps) => {
	const noAuthors = courseAuthors.length === 0 && <p>No Authors</p>;
	const authorsList = useSelector(getAuthors);
	return (
		<>
			<h3>Course Authors</h3>
			{noAuthors}
			<ul>
				{courseAuthors?.map((author) => (
					<li key={author ? author : (author as unknown as string)}>
						{author
							? getAuthorName([author as unknown as string], authorsList)
							: 'Unknown author'}
						<Button
							type='button'
							className={styles.buttonAuthorsList}
							buttonText='-'
							size={ButtonSize.extraSmall}
							onClick={() => removeCourseAuthor(author)}
						/>
					</li>
				))}
			</ul>
		</>
	);
};

export default CourseAuthors;
