import React, { ChangeEvent, useState } from 'react';
import Button, { ButtonSize } from '../../../../../../common/Button';
import Input from '../../../../../../common/Input/Input';
import { AuthorItemProps } from './AuthorItem.types';
import { v4 as uuidv4 } from 'uuid';

const AuthorItem = ({ addNewAuthor }: AuthorItemProps) => {
	const [author, setAuthor] = useState('');
	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		setAuthor(event.target.value);
	}

	function handleAddNewAuthor() {
		if (author.length < 1) {
			window.alert('Name should be 2 chars minimum.');
			return;
		}
		addNewAuthor({ id: `${uuidv4()}`, name: author });
		setAuthor('');
	}
	return (
		<div>
			<Input label='Author Name' onChange={handleInputChange} value={author} />
			<Button
				size={ButtonSize.large}
				buttonText='Create Author'
				type='button'
				onClick={handleAddNewAuthor}
			/>
		</div>
	);
};

export default AuthorItem;
