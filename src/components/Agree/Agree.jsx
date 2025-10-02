import { Checkbox } from '../Checkbox';

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

  return (
    <div className={`agree-wrap ${className}`}>
      {/* header */}
      <div className="agree-head">
        <div className="agree-head__title">{title}</div>
        {subtitle && <p className="agree-head__subtitle">{subtitle}</p>}
      </div>

      {/* 전체 안내 문구 */}
      {children && <div className="agree-guide">{children}</div>}

      {/* 약관 리스트 */}
      <div className="agree-content">
        {options.map(option => (
          <div key={option.value} className="agree-item">
            {/* 개별 약관 내용 */}
            {option.children && contents[option.children] && (
              <div className="agree-item__content">
                {contents[option.children]}
              </div>
            )}
            {/* 체크박스 */}
            <Checkbox
              id={`agree-${option.value}`}
              value={value}
              option={option}
              onChange={toggle}
            />
          </div>
        ))}
      </div>

      {/* 전체 동의 체크박스 */}
      {showSelectAll && (
        <div className="agree-footer">
          <Checkbox
            id="agree-all"
            option={{ value: '__All__', label: selectAllLabel }}
            checked={isAll}
            indeterminate={isSome}
            onChange={toggleAll}
          />
        </div>
      )}
    </div>
  );
}
