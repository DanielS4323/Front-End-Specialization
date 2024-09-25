import React from 'react';
import {
	CourseCard,
	type CourseCardProps,
} from './components/CourseCard/index';
import SearchBar from './components/SearchBar/SearchBar';
import styles from './Courses.module.css';
import Button, { ButtonSize } from '../../common/Button/index';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	getCourses,
	isErrorCourses,
	isLoadingCourses,
} from '../../store/courses/selectors';
import { isRoleAdmin } from '../../store/user/selectors';

const Courses = () => {
	const navigate = useNavigate();
	const courseList = useSelector(getCourses);
	const isLoading = useSelector(isLoadingCourses);
	const isError = useSelector(isErrorCourses);
	const isAdmin = useSelector(isRoleAdmin);
	const list = courseList?.map((course: CourseCardProps) => (
		<CourseCard
			id={course.id}
			key={course.id}
			title={course.title}
			duration={course.duration}
			creationDate={course.creationDate}
			description={course.description}
			authors={course.authors}
		/>
	));

	if (isError) {
		return (
			<p>
				Error occured
				<Button
					size={ButtonSize.medium}
					onClick={() => window.location.assign(window.location.origin)}
					buttonText='Go Back'
					type='button'
				></Button>
			</p>
		);
	}
	if (courseList?.length === 0) {
		return <EmptyCourseList />;
	}

	return (
		<main className={styles.main}>
			<section className={styles.search_section}>
				<SearchBar />
				{isAdmin && (
					<Button
						buttonText='Add new Course'
						size={ButtonSize.large}
						onClick={() => navigate('/courses/add')}
						type='button'
					/>
				)}
			</section>
			{isLoading && <p>Loading Courses...</p>}
			<section>{list}</section>
		</main>
	);
};

export default Courses;
