import { useState } from 'react';

export default function PhoneInput({
  id,
  label,
  value = '',
  className = '',
  error,
  disabled = false,
  required = false,
  onChange,
}) {
  // 초기값 분리
  const parts = value ? value.split('-') : ['', '', ''];
  const [first, setFirst] = useState(parts[0] || '010');
  const [middle, setMiddle] = useState(parts[1] || '');
  const [last, setLast] = useState(parts[2] || '');
  const inputId = id || `phone-${Math.random().toString(36).substring(2, 9)}`;

  const handleChange = (part, val) => {
    const num = val.replace(/\D/g, '');
    if (part === 'middle') setMiddle(num);
    if (part === 'last') setLast(num);

    const fullValue = [
      first,
      part === 'middle' ? num : middle,
      part === 'last' ? num : last,
    ]
      .filter(Boolean)
      .join('-');

    if (onChange) onChange(fullValue);
  };

  const handleFirstChange = e => {
    const newFirst = e.target.value;
    setFirst(newFirst);
    const fullValue = [newFirst, middle, last].filter(Boolean).join('-');
    if (onChange) onChange(fullValue);
  };

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}

      <div className="flex items-center gap-2">
        <select
          value={first}
          onChange={handleFirstChange}
          disabled={disabled}
          className="w-24 border border-gray-300 rounded-md p-2"
        >
          <option value="010">010</option>
          <option value="011">011</option>
          <option value="016">016</option>
          <option value="017">017</option>
          <option value="018">018</option>
          <option value="019">019</option>
        </select>

        <span>-</span>

        <input
          type="text"
          value={middle}
          onChange={e => handleChange('middle', e.target.value)}
          placeholder="0000"
          maxLength="4"
          className="w-20 border border-gray-300 rounded-md p-2 text-center"
          disabled={disabled}
        />

        <span>-</span>

        <input
          type="text"
          value={last}
          onChange={e => handleChange('last', e.target.value)}
          placeholder="0000"
          maxLength="4"
          className="w-20 border border-gray-300 rounded-md p-2 text-center"
          disabled={disabled}
        />
      </div>

      {error && (
        <p
          id={`${inputId}-error`}
          className="input-error text-red-500 text-sm mt-1"
        >
          {error}
        </p>
      )}
    </div>
  );
}
