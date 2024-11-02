import React from 'react';
import Loader from '../Loader';

import '../../styles/variables.css';

import './Button.css';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	/** Состояние загрузки */
	loading?: boolean;
	/** Текст кнопки */
	children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
	loading,
	disabled,
	children,
	className,
	...props
}) => {
	const loadingClassName = loading ? 'button--loading' : '';
	const disabledClassName = disabled ? 'button--disabled' : '';
	return (
		<button
			className={`button ${className} ${loadingClassName} ${disabledClassName}`}
			disabled={loading || disabled}
			{...props}
		>
			{loading && (
				<Loader size="s" color={`var(--button-primary-text)`} />
			)}
			{children}
		</button>
	);
};

export default Button;
