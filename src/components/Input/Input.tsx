import React from 'react';

import classes from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, ...props }, ref) => {
    return (
      <div className={`${classes.inputWrapper} ${className || ''} ${afterSlot ? classes.afterSlot : ''}`}>
        <input
          className={classes.input}
          type="text"
          {...props}
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {afterSlot && <div className={classes.iconWrapper}>{afterSlot}</div>}
      </div>
    );
  },
);

export default Input;
