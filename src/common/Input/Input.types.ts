import { InputHTMLAttributes } from 'react';
export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}
