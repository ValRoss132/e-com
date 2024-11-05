import { useState, useEffect, useRef } from 'react';
import React from 'react';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import './MultiDropDown.css';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ className, options, value, onChange, disabled, getTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickOnDialog = event.target === dropdownRef.current;
      const isClickOnDialogChildrenNodes = dropdownRef.current?.contains(event.target as Node);

      const isClickOutsideOfDialog = !(isClickOnDialog || isClickOnDialogChildrenNodes);
      if (isClickOutsideOfDialog && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleToggleDropDown = (event: React.MouseEvent<Element, MouseEvent>) => {
    if (disabled) return;
    event.stopPropagation();
    setIsOpen(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleOptionClick = (option: Option) => {
    const updatedValue = [...value];
    const index = updatedValue.findIndex((v) => v.key === option.key);
    if (index > -1) {
      updatedValue.splice(index, 1);
    } else {
      updatedValue.push(option);
    }
    onChange(updatedValue);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const filtered = options.filter((option) => option.value.toLowerCase().includes(value.toLowerCase()));
    setFilteredOptions(filtered);
  };

  useEffect(() => {
    setInputValue(value.length === 0 ? '' : getTitle(value));
  }, [value, getTitle]);

  return (
    <div className={`multi-dropdown ${className}`}>
      <div className="multi-dropdown_input-wrapper" onClick={(e) => handleToggleDropDown(e)}>
        <Input
          type="text"
          className="multi-dropdown_input"
          afterSlot={<ArrowDownIcon color="secondary" />}
          placeholder={getTitle(value)}
          value={inputValue}
          disabled={disabled}
          onChange={handleInputChange}
          ref={inputRef}
        />
      </div>
      {isOpen && !disabled && (
        <div>
          <ul className="multi-dropdown__options" ref={dropdownRef}>
            {filteredOptions.map((option) => (
              <li
                key={option.key}
                className={`multi-dropdown_option ${value.some((v) => v.key === option.key) ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
