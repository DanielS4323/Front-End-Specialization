import React from 'react';
import {
	formatCreationDate,
	getCourseDuration,
	getAuthorName,
} from '../../../../helpers/index';
import styles from './CourseCard.module.css';
import Button, { ButtonSize } from '../../../../common/Button/index';
import { useNavigate } from 'react-router-dom';
import type { CourseCardProps } from './CourseCard.types';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAuthors,
	isLoadingAuthors,
} from '../../../../store/authors/selectors';
import { isRoleAdmin } from '../../../../store/user/selectors';
import { deleteCourseThunk } from '../../../../store/courses/thunk';
import { AppDispatch } from '../../../../store/rootReducer';

export const CourseCard = (course: CourseCardProps) => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const isLoading = useSelector(isLoadingAuthors);
	const isAdmin = useSelector(isRoleAdmin);
	const { id, title, duration, creationDate, description, authors } = course;
	const authorsList = useSelector(getAuthors);
	function handleCourseInfoId(id: string) {
		navigate(`/courses/${id}`);
	}

	function handleDeleteCourse(id: string) {
		dispatch(deleteCourseThunk(id));
	}

	function handleUpdateCourse(id: string) {
		navigate(`/courses/update/${id}`, { state: id });
	}
	return (
		<article key={id} className={styles.article}>
			<div className={styles.description}>
				<h2>{title}</h2>
				<p>{description}</p>
			</div>
			<div className={styles.info}>
				<p className={styles.authors}>
					{!isLoading && (
						<>Authors: {getAuthorName(authors, authorsList).join(', ')}</>
					)}
				</p>
				<p>Duration: {getCourseDuration(duration)}</p>
				<p>Created: {formatCreationDate(creationDate)}</p>
				<div className={styles.buttonGroup}>
					<Button
						buttonText='Show Course'
						onClick={() => handleCourseInfoId(id)}
						size={ButtonSize.small}
					/>
					{isAdmin && (
						<>
							<Button
								buttonText='Delete'
								onClick={() => handleDeleteCourse(id)}
								size={ButtonSize.small}
							/>
							<Button
								buttonText='Update'
								onClick={() => handleUpdateCourse(id)}
								size={ButtonSize.small}
							/>
						</>
					)}
				</div>
			</div>
		</article>
	);
};
