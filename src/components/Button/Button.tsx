import React from 'react';
import Loader from '../Loader';
import cn from 'classnames';
import 'styles/variables.css';
import classes from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading, disabled, children, className, ...props }) => {
  return (
    <button
      className={cn(
        classes.button,
        className,
        disabled && classes['button--disabled'],
        loading && classes['button--loading'],
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Loader size="s" color={`var(--button-primary-text)`} />}
      {children}
    </button>
  );
};

export default Button;
