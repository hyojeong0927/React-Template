import { useEffect, useRef } from 'react';

export default function Checkbox({
  id,
  value = [],
  option,
  checked,
  onChange,
  disabled = false,
  indeterminate = false,
  className = '',
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const isChecked =
    typeof checked === 'boolean' ? checked : value.includes(option.value);

  return (
    <div className={`checkbox ${className}`}>
      <label htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          ref={ref}
          disabled={disabled || option.disabled}
          aria-disabled={disabled || option.disabled ? 'true' : undefined}
          checked={isChecked}
          onChange={() => onChange?.(option.value)}
          className="checkbox__input"
          {...(indeterminate ? { 'aria-checked': 'mixed' } : {})}
          {...(option.ariaLabel ? { 'aria-label': option.ariaLabel } : {})}
        />
        <span className="checkbox__label" title={option.label}>
          {option.label}
        </span>
      </label>
    </div>
  );
}
