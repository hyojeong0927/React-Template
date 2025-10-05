import React from 'react';

export default function Button({
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  onClick,
  children,
  className = '',
}) {
  const baseStyle =
    'inline-flex items-center justify-center font-medium rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 gap-2';

  const variantStyle = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    outline:
      'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizeStyle = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]} ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
      } ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          로딩중...
        </span>
      ) : (
        <>
          {iconLeft && <span className="flex items-center">{iconLeft}</span>}
          <span>{children}</span>
          {iconRight && <span className="flex items-center">{iconRight}</span>}
        </>
      )}
    </button>
  );
}
