import { useEffect, useState } from 'react';
import Checkbox from './Checkbox';

export default function CheckboxGroup({
  options,
  value = [],
  onChange,
  idPrefix = 'cb',
  showSelectAll = false,
  selectAllLabel = '전체 선택',
  groupLabel = '체크박스 그룹',
  showSelectionCount = true,
  disabled = false,
  className = '',
}) {
  const [initialValue, setInitialValue] = useState([]);

  useEffect(() => {
    const initialChecked = options
      .filter(opt => opt.checked)
      .map(opt => opt.value);

    setInitialValue(initialChecked);

    if (initialChecked.length && value.length === 0) {
      onChange?.(initialChecked); // 외부 state 업데이트
    }
  }, [options]);

  const allValues = options.map(option => option.value);
  const currentValue = value.length ? value : initialValue;

  const isAll =
    options.length > 0 && allValues.every(val => currentValue.includes(val));
  const isSome = currentValue.length > 0 && !isAll;

  const toggle = optionValue => {
    if (disabled) return;
    const newValue = currentValue.includes(optionValue)
      ? currentValue.filter(v => v !== optionValue)
      : [...currentValue, optionValue];
    onChange?.(newValue);
  };

  const toggleAll = () => {
    if (disabled) return;
    onChange?.(isAll ? [] : [...allValues]);
  };

  return (
    <fieldset className={`checkbox-group${className ? ` ${className}` : ''}`}>
      <legend className="checkbox-group__legend">
        {groupLabel}
        {showSelectionCount && (
          <span className="selection-count">
            ({currentValue.length} / {options.length} 선택됨)
          </span>
        )}
      </legend>
      {/* 전체 선택 시 */}
      {showSelectAll && (
        <div className="checkbox-group__select-all">
          <Checkbox
            id={`${idPrefix}-all`}
            option={{ value: '__All__', label: selectAllLabel }}
            checked={isAll}
            indeterminate={isSome}
            onChange={toggleAll}
            disabled={disabled}
            value={currentValue}
          />
        </div>
      )}

      <ul className="checkbox-group__list">
        {options.map(option => (
          <li key={option.value}>
            <Checkbox
              id={`${idPrefix}-${option.value}`}
              value={currentValue}
              option={option}
              onChange={toggle}
              disabled={disabled}
            />
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
