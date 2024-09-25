import React from 'react';
import styles from './SearchBar.module.css';
import Input from '../../../../common/Input/Input';
import Button, { ButtonSize } from '../../../../common/Button/index';

const SearchBar = () => {
	return (
		<div className={styles.searchbar}>
			<Input
				type='search'
				placeholder='Input text'
				id='search'
				className={styles.inputbar}
			/>
			<Button buttonText='Search' size={ButtonSize.small} onClick={null} />
		</div>
	);
};

export default SearchBar;
