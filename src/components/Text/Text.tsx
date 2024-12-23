import * as React from 'react';
import cn from 'classnames';
import classes from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({ className, view, tag = 'p', weight, children, color, maxLines }) => {
  const Component = tag;

  return (
    <Component
      className={cn(
        classes.text,
        className,
        view && classes[`view-${view}`],
        weight && classes[`weight-${weight}`],
        color && classes[`color-${color}`],
      )}
      style={
        {
          ['--max-lines']: maxLines,
        } as React.CSSProperties
      }
    >
      {children}
    </Component>
  );
};

export default Text;
