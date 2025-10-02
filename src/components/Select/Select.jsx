import { useRef, useState, useEffect } from 'react';

export default function Selectbox({
  id,
  name,
  options = [],
  selected,
  onChange,
  placeholder = '선택하세요',
  ariaLabel,
  className = '',
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const ref = useRef(null);
  const idPrefix = id || 'selectbox';

  const selectedOption =
    options.find(opt => opt.value === selected)?.label || '';

  useEffect(() => {
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setHighlightIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = e => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setHighlightIndex(0);
        } else if (highlightIndex >= 0) {
          onChange(options[highlightIndex].value);
          setOpen(false);
          setHighlightIndex(-1);
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setHighlightIndex(0);
        } else {
          setHighlightIndex(prev => (prev < options.length - 1 ? prev + 1 : 0));
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (open) {
          setHighlightIndex(prev => (prev > 0 ? prev - 1 : options.length - 1));
        }
        break;

      case 'Escape':
        setOpen(false);
        setHighlightIndex(-1);
        break;

      default:
        break;
    }
  };
  return (
    <div
      id={id}
      className={`selectbox ${className} ${disabled ? 'disabled' : ''}`}
      aria-haspopup="listbox"
      aria-expanded={open}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
    >
      {/* 선택 값*/}
      <div
        className="selectbox-selected"
        title={selectedOption || placeholder}
        onClick={() => !disabled && setOpen(prev => !prev)}
        disabled={disabled}
        aria-controls={`${id}-listbox`}
        aria-haspopup="listbox"
      >
        {selectedOption || <span className="placeholder">{placeholder}</span>}
        <span>
          <i className="icon arrow-down"></i>
        </span>
      </div>
      <input type="hidden" name={name} value={selected || ''} />
      {/* 옵션 목록 */}
      {open && (
        <ul
          id={`${idPrefix}`}
          role="listbox"
          className="selectbox-option__list"
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${idPrefix}-${option.value}`}
              role="option"
              aria-selected={selected === option.value}
              aria-label={option.ariaLabel || option.label}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
                setHighlightIndex(-1);
              }}
              className={`selectbox-option 
                ${selected === option.value ? 'selected' : ''}
                ${highlightIndex === index ? 'highlight' : ''}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
