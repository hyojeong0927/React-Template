import { useState, useRef, useEffect } from 'react';

export default function SelectboxSearch({
  options = [],
  selected = null,
  onChange = () => {},
  placeholder = 'Select...',
  className = 'w-72',
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    function onDocClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const handleSelect = value => {
    onChange(value);
    setOpen(false);
    setSearch('');
  };

  const selectedLabel = options.find(
    opt => opt.value === selected || opt.id === selected,
  )?.label;

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* 버튼 */}
      <button
        type="button"
        className="w-full border rounded-md px-3 py-2 flex items-center justify-between"
        onClick={() => setOpen(v => !v)}
      >
        <span className="truncate">{selectedLabel || placeholder}</span>
        <svg
          className={`h-4 w-4 transform ${open ? 'rotate-180' : ''}`}
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
      </button>

      {/* 드롭다운 */}
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
          {/* 검색창 */}
          <div className="p-2">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="검색..."
              className="w-full border rounded px-2 py-1"
            />
          </div>

          {/* 옵션 리스트 */}
          <ul className="max-h-48 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(opt => (
                <li
                  key={opt.id}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(opt.id)}
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-400">검색 결과 없음</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
