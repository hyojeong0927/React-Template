import { useState } from 'react';
import { Checkbox } from '../checkbox';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function Agree({
  title,
  options = [],
  value = [],
  subtitle,
  children,
  contents = {},
  onChange,
  showSelectAll = true,
  selectAllLabel = '전체 동의',
  className = '',
}) {
  const allValues = options.map(opt => opt.value);
  const isAll = value.length === allValues.length;
  const isSome = value.length > 0 && !isAll;

  const toggle = optionValue => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange?.(newValue);
  };

  const toggleAll = () => {
    onChange?.(isAll ? [] : [...allValues]);
  };

  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpand = val => {
    setExpandedItems(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val],
    );
  };

  return (
    <fieldset className={`agree-wrap p-4 border rounded-lg ${className}`}>
      {/* header */}
      <legend className="text-lg font-bold mb-2">{title}</legend>
      {subtitle && <p className="text-sm text-gray-600 mb-4">{subtitle}</p>}
      {children && <div className="agree-guide mb-4">{children}</div>}

      {/* 전체 동의 */}
      {showSelectAll && (
        <div className="agree-footer mb-4">
          <Checkbox
            id="agree-all"
            option={{ value: '__All__', label: selectAllLabel }}
            checked={isAll}
            indeterminate={isSome}
            onChange={toggleAll}
          />
        </div>
      )}

      {/* 약관 리스트 */}
      <div className="agree-content space-y-3">
        {options.map(option => {
          const isExpanded = expandedItems.includes(option.value);

          return (
            <div key={option.value} className="agree-item border rounded p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`agree-${option.value}`}
                    value={value}
                    option={option}
                    onChange={toggle}
                  />
                  <span className="font-medium">{option.label}</span>
                </div>

                {/* 펼치기 버튼 */}
                {contents[option.children] && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(option.value)}
                    aria-expanded={isExpanded}
                    aria-controls={`content-${option.value}`}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                )}
              </div>

              {/* 펼쳐진 내용 */}
              {contents[option.children] && isExpanded && (
                <div
                  id={`content-${option.value}`}
                  className="agree-item__content mt-2 text-sm text-gray-600 border-t pt-2"
                >
                  {contents[option.children]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
