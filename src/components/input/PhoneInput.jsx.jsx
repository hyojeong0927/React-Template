import { useState } from 'react';
import Input from './Input';
import Selectbox from '../select/Selectbox';

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

  // 값 업데이트
  const updateValue = (newFirst, newMiddle, newLast) => {
    const full = [newFirst, newMiddle, newLast].filter(Boolean).join('-');
    if (onChange) onChange(full);
  };

  // 각 입력 핸들러
  const handleFirstChange = val => {
    setFirst(val);
    updateValue(val, middle, last);
  };

  const handleMiddleChange = e => {
    const val = e.target.value.replace(/\D/g, '');
    setMiddle(val);
    updateValue(first, val, last);
  };

  const handleLastChange = e => {
    const val = e.target.value.replace(/\D/g, '');
    setLast(val);
    updateValue(first, middle, val);
  };

  // 선택 옵션
  const phoneOptions = [
    { label: '010', value: '010' },
    { label: '011', value: '011' },
    { label: '016', value: '016' },
    { label: '017', value: '017' },
    { label: '018', value: '018' },
    { label: '019', value: '019' },
  ];

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label block mb-1">
          {label} {required && <span className="required text-red-500">*</span>}
        </label>
      )}

      <div className="flex items-center gap-2">
        {/* ✅ 커스텀 Selectbox 적용 */}
        <Selectbox
          id={`${inputId}-first`}
          name="phoneFirst"
          options={phoneOptions}
          selected={first}
          onChange={handleFirstChange}
          placeholder="선택"
          disabled={disabled}
          className="w-24"
          ariaLabel="전화번호 앞자리 선택"
        />

        <span>-</span>

        <Input
          type="text"
          value={middle}
          onChange={handleMiddleChange}
          placeholder="0000"
          maxLength={4}
          className="w-20 text-center"
          disabled={disabled}
        />

        <span>-</span>

        <Input
          type="text"
          value={last}
          onChange={handleLastChange}
          placeholder="0000"
          maxLength={4}
          className="w-20 text-center"
          disabled={disabled}
        />
      </div>

      {error && (
        <p id={`${inputId}-error`} className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
