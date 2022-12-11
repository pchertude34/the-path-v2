import React from 'react';
import clsx from 'clsx';

const colorClasses = {
  primary:
    'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 disabled:hover:bg-primary-600',
  secondary:
    'bg-secondary-600 hover:bg-secondary-700 focus:ring-secondary-500 disabled:hover:bg-secondary-600',
};

type ButtonProps = {
  as?: keyof JSX.IntrinsicElements;
  color?: keyof typeof colorClasses;
  href?: string;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  onClick?: () => void;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
};

export default function Button(props: ButtonProps) {
  const {
    as: Elem = 'button',
    color = 'primary',
    href,
    disabled = false,
    isLoading = false,
    className,
    leftIcon,
    rightIcon,
    onClick,
    children,
  } = props;

  return (
    <Elem
      href={href}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={clsx(
        className,
        'inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 disabled:opacity-50 disabled:cursor-not-allowed',
        colorClasses[color]
      )}
    >
      {isLoading ? (
        <svg
          className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        leftIcon
      )}
      {children}
      {rightIcon}
    </Elem>
  );
}
