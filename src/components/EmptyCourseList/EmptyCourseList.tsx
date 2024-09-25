import React from 'react';
import styles from './EmptyCourseList.module.css';
import Button, { ButtonSize } from '../../common/Button/index';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isRoleAdmin } from './../../store/user/selectors';

const EmptyCourseList = () => {
	const navigate = useNavigate();
	const isAdmin = useSelector(isRoleAdmin);
	return (
		<div className={styles.list}>
			<h1>Course List is Empty</h1>
			<h4>Please use "Add New Course" button to add your first course'</h4>
			{isAdmin ? (
				<Button
					buttonText='Add New Course'
					size={ButtonSize.large}
					onClick={() => navigate('/courses/add')}
				/>
			) : (
				<p>
					You don't have permissions to create a course. Please log in as ADMIN
				</p>
			)}
		</div>
	);
};

export default EmptyCourseList;
