import React from 'react';
import { InputBaseProps } from './Input.types';

const Input = ({ label, ...props }: InputBaseProps) => {
	return (
		<>
			{label && (
				<label htmlFor={label}>
					{label.replace(/^./, (str) => str.toUpperCase())}
				</label>
			)}
			<input {...props} id={label} name={label} />
		</>
	);
};

export default Input;
