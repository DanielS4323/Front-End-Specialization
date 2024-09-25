import React from 'react';
import { ButtonProps } from './Button.types';
import styles from './Button.module.css';

const Button = ({ buttonText, size, ...props }: ButtonProps) => {
	return (
		<button className={styles[size] + ' ' + styles.button} {...props}>
			{buttonText}
		</button>
	);
};
export default Button;
