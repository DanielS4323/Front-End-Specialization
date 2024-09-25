import React from 'react';
import { AuthorListProps } from './AuthorList.types';
import Button, { ButtonSize } from '../../../../../../common/Button/index';
import styles from './AuthorsList.module.css';
import { useSelector } from 'react-redux';
import { getAuthors } from '../../../../../../store/authors/selectors';
const AuthorList = ({ addCourseAuthor }: AuthorListProps) => {
	const authorsList = useSelector(getAuthors);
	return (
		<ul>
			<h3>Authors List</h3>
			{authorsList?.map((author) => (
				<li key={author?.id}>
					{author?.name}{' '}
					<Button
						type='button'
						buttonText='+'
						size={ButtonSize.extraSmall}
						onClick={() => addCourseAuthor(author)}
						className={styles.buttonAuthorsList}
					/>
					<Button
						type='button'
						buttonText='-'
						size={ButtonSize.extraSmall}
						onClick={null}
						className={styles.buttonAuthorsList}
					/>
				</li>
			))}
		</ul>
	);
};

export default AuthorList;
