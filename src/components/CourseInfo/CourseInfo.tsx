import React from 'react';
import styles from './CourseInfo.module.css';
import { type CourseCardProps } from '../Courses/components/CourseCard/CourseCard.types';
import {
	formatCreationDate,
	getAuthorName,
	getCourseDuration,
} from '../../helpers/index';
import Button, { ButtonSize } from '../../common/Button/index';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCourses } from '../../store/courses/selectors';
import { getAuthors } from '../../store/authors/selectors';

const CourseInfo = () => {
	const params = useParams();
	const navigate = useNavigate();
	const courses = useSelector(getCourses);
	const authorsList = useSelector(getAuthors);
	const courseInfoData: CourseCardProps = courses.find(
		(course) => course.id === params.id
	);

	function handleBackToCourses() {
		navigate('/courses');
	}

	const { id, title, duration, creationDate, description, authors } =
		courseInfoData;
	const durationString = getCourseDuration(duration);
	const [time, unit] = durationString.split(' ');
	return (
		<section className={styles.section}>
			<h2>{title}</h2>
			<article className={styles.courseInfo}>
				<div className={styles.description}>
					<h3>Description:</h3>
					<p>{description}</p>
				</div>
				<ul className={styles.info}>
					<li>
						<strong>ID:</strong> {id}
					</li>
					<li>
						<strong>Duration:</strong>
						<span>{time} </span>
						{unit}
					</li>
					<li>
						<strong>Created:</strong> {formatCreationDate(creationDate)}
					</li>
					<li className={styles.authors}>
						<strong>Authors:</strong>{' '}
						{getAuthorName(authors, authorsList).join(', ')}
					</li>
				</ul>
			</article>
			<div className={styles.backButton}>
				<Button
					buttonText='Back'
					onClick={handleBackToCourses}
					size={ButtonSize.medium}
				/>
			</div>
		</section>
	);
};

export default CourseInfo;
