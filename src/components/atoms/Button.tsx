import React, { memo } from 'react';
import classNames from 'classnames';

export interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: variant;
  size?: size;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export declare type variant = 'gradient' | 'text' | 'primary' | 'danger';
export declare type size = 'sm' | 'md' | 'lg';

export const Button: React.FC<ButtonProps> = memo(({ children, className, variant = 'primary', disabled, ...props }) => {

  const buttonCls = classNames('middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs rounded-lg  flex items-center gap-4 capitalize', {
    [`${className}`]: !!className,
    'bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full': variant === 'gradient',
    'bg-transparent': variant === 'text',
    'bg-red-600 hover:bg-red-700 text-white px-2 py-2 justify-center': variant === 'danger',
    'bg-blue-500 hover:bg-blue-700 text-white px-2 py-2 justify-center': variant === 'primary'
  });
  
  return(
    <button className={buttonCls} disabled={disabled} {...props}>
      {children}
    </button>
  );
});
