import React from 'react';

import './Input.css';

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
      <div className={`input-wrapper ${className} ${afterSlot ? 'afterSlot' : ''}`}>
        <input
          className={`input ${className}`}
          type="text"
          {...props}
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {afterSlot && <div className="icon-wrapper">{afterSlot}</div>}
      </div>
    );
  },
);

export default Input;
