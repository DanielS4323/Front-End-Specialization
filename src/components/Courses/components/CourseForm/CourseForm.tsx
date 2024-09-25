import React, { FormEvent, useEffect, useState } from 'react';
import Input from '../../../../common/Input/Input';
import type { AuthorsProps, CourseErrors } from './CourseForm.types';
import { CourseCardProps } from '../CourseCard';
import Button, { ButtonSize } from '../../../../common/Button/index';
import { validateCourse } from '../../../../helpers/index';
import styles from './CourseForm.module.css';
import DurationClock from './components/DurationClock/DurationClock';
import AuthorItem from './components/AuthorItem/AuthorItem';
import AuthorList from './components/AuthorList/AuthorList';
import CourseAuthors from './components/CourseAuthors/CourseAuthors';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	postCourseThunk,
	updateCourseThunk,
} from '../../../../store/courses/thunk';
import { AppDispatch } from 'src/store/rootReducer';
import { postAuthors } from '../../../../store/authors/thunk';
import useFetch from '../../../../hooks/useFetch';
import { BASE_URL, COURSES, CoursesResponse } from '../../../../services';

const CourseForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { state } = useLocation();
	const [courseAuthors, setCourseAuthors] = useState<string[]>([]);
	const [formDataCourse, setFormDataCourse] = useState<CourseCardProps>({
		title: '',
		description: '',
		duration: 0,
		authors: [],
	});

	const { data: courseToUpdate } = useFetch<CoursesResponse>(
		state ? `${BASE_URL}/${COURSES}/${state}` : null
	);
	useEffect(() => {
		if (courseToUpdate?.result) {
			const { id, title, description, duration, authors, creationDate } =
				courseToUpdate.result as unknown as CourseCardProps;
			setFormDataCourse({
				id,
				title,
				description,
				duration,
				authors,
				creationDate,
			});
			setCourseAuthors(authors as string[]);
		}
	}, [courseToUpdate]);

	const [courseErrors, setCourseErrors] = useState<CourseErrors>({
		title: '',
		duration: null,
		description: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormDataCourse((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmitForm = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const errors: CourseErrors = validateCourse(formDataCourse);
		setCourseErrors(errors);
		if (Object.keys(errors).length === 0) {
			const newCourse: CourseCardProps = {
				id: state ? state : '',
				title: formDataCourse.title,
				description: formDataCourse.description,
				creationDate: state
					? formDataCourse.creationDate
					: String(new Date().toLocaleDateString()),
				duration: Number(formDataCourse.duration),
				authors: courseAuthors,
			};
			if (state) {
				dispatch(updateCourseThunk(newCourse));
			} else {
				dispatch(postCourseThunk(newCourse));
			}
			navigate('/', { replace: true });
		}
	};
	function handleCreateNewAuthor(newAuthor: AuthorsProps) {
		dispatch(postAuthors(newAuthor));
	}

	function handleSetCourseAuthor(courseAuthor: AuthorsProps): void {
		setCourseAuthors((prev) => {
			const existingAuthor = prev.find((author) => author === courseAuthor.id);
			if (existingAuthor) {
				return prev;
			}
			return [...prev, courseAuthor.id];
		});
	}

	function removeCourseAuthor(id: string) {
		setCourseAuthors((prev) => prev.filter((author) => author !== id));
	}

	return (
		<form
			className={styles.courseForm}
			onSubmit={handleSubmitForm}
			id='createCourseForm'
			name='createCourse'
		>
			<h1>Main info</h1>
			<Input
				label='title'
				type='text'
				onChange={handleChange}
				value={formDataCourse.title}
			/>
			{courseErrors.title && (
				<span className={styles.courseErrors}>{courseErrors.title}</span>
			)}
			<Input
				label='description'
				type='textarea'
				onChange={handleChange}
				value={formDataCourse.description}
			/>
			{courseErrors.description && (
				<span className={styles.courseErrors}>{courseErrors.description}</span>
			)}
			<div className={styles.durationClock}>
				<Input
					label='duration'
					type='number'
					onChange={handleChange}
					value={formDataCourse.duration}
					min='0'
				/>
				<DurationClock duration={formDataCourse.duration} />
			</div>
			{courseErrors.duration && (
				<span className={styles.courseErrors}>{courseErrors.duration}</span>
			)}
			<div className={styles.authorsSection}>
				<div>
					<AuthorItem addNewAuthor={handleCreateNewAuthor} />
					<AuthorList addCourseAuthor={handleSetCourseAuthor} />
				</div>
				<div>
					<CourseAuthors
						courseAuthors={courseAuthors}
						removeCourseAuthor={removeCourseAuthor}
					/>
				</div>
			</div>
			<div className={styles.cancelButton}>
				<Button
					buttonText='Cancel'
					type='button'
					size={ButtonSize.large}
					onClick={() => navigate(-1)}
				/>
				<Button
					buttonText={state ? 'Update Course' : 'Create Course'}
					type='submit'
					size={ButtonSize.large}
				/>
			</div>
		</form>
	);
};

export default CourseForm;
