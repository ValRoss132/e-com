import React, { useState } from 'react';
import CheckIcon from '../icons/CheckIcon';
import './CheckBox.css';

import classNames from 'classnames';

export type CheckBoxProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'onChange'
> & {
	/** Вызывается при клике на чекбокс */
	onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, ...props }) => {
	const classDisabled = props.disabled ? 'disabled' : '';
	return (
		<label className="check">
			<div className={`check__box ${classDisabled}`}>
				{checked && (
					<CheckIcon
						className={`check-icon`}
						width={40}
						height={40}
					/>
				)}
			</div>
			<input
				className="check__input"
				type="checkbox"
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				{...props}
			/>
		</label>
	);
};

export default CheckBox;
