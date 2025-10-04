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
      ref={ref}
      className={`relative ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      aria-haspopup="listbox"
      aria-expanded={open}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
    >
      {/* 선택 값 */}
      <div
        className="w-full border rounded-md px-3 py-2 flex justify-between items-center cursor-pointer bg-white"
        title={selectedOption || placeholder}
        onClick={() => !disabled && setOpen(v => !v)}
        aria-controls={`${id}-listbox`}
        aria-haspopup="listbox"
      >
        <span className="truncate text-gray-700">
          {selectedOption || (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </span>
        <span>
          <svg
            className={`w-4 h-4 transform transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M6 8l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <input type="hidden" name={name} value={selected || ''} />

      {/* 옵션 목록 */}
      {open && (
        <ul
          id={`${idPrefix}`}
          role="listbox"
          className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg"
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
              className={`px-3 py-2 cursor-pointer select-none truncate ${
                selected === option.value
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100'
              } ${highlightIndex === index ? 'bg-gray-200' : ''}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
