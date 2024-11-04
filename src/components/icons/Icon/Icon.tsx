import * as React from 'react';
import './icon.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  color,
  children,
  width = '24',
  height = '24',
  ...props
}) => {
  return (
    <svg
      className={`${color || ''} ${className || ''}`}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
