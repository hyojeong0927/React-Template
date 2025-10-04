import { useEffect, useRef, useState } from 'react';

export default function SelectboxCheckbox({
  items = [],
  selectedIds = [],
  onChange = () => {},
  placeholder = 'Select...',
  className = 'w-72',
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(new Set(selectedIds));
  const allRef = useRef(null);
  const containerRef = useRef(null);

  const MAX_LABEL_LENGTH = 30; // 표시 최대 문자 길이

  // 외부 selectedIds 변경 시 내부 동기화
  useEffect(() => {
    setSelected(new Set(selectedIds));
  }, [selectedIds]);

  // indeterminate 상태 설정
  useEffect(() => {
    const total = items.length;
    const count = selected.size;
    if (allRef.current) {
      allRef.current.indeterminate = count > 0 && count < total;
    }
  }, [selected, items]);

  // 바깥 클릭 닫기
  useEffect(() => {
    function onDocClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const emitChange = next => {
    setTimeout(() => onChange(Array.from(next)), 0);
  };

  const toggleItem = id => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      emitChange(next);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected(prev => {
      const total = items.length;
      const next =
        prev.size === total ? new Set() : new Set(items.map(it => it.id));
      emitChange(next);
      return next;
    });
  };

  // 선택 라벨 생성 + 말줄임 로직
  const selectedLabels = items
    .filter(it => selected.has(it.id))
    .map(it => it.label);

  let displayLabel = placeholder;
  if (selected.size > 0) {
    const baseLabel = selectedLabels.join(', ');
    const label =
      baseLabel.length > MAX_LABEL_LENGTH
        ? baseLabel.slice(0, MAX_LABEL_LENGTH) + '...'
        : baseLabel;

    displayLabel =
      selected.size < items.length
        ? `${label} (${selected.size}개 선택)`
        : label;
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className="w-full text-left border rounded-md px-3 py-2 flex items-center justify-between"
      >
        <span className="truncate">{displayLabel}</span>
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

      {open && (
        <ul
          role="listbox"
          aria-multiselectable="true"
          tabIndex={-1}
          className="absolute z-10 mt-1 w-full bg-white border rounded-md max-h-56 overflow-auto shadow-lg p-2"
        >
          {/* 전체 선택 */}
          <li className="px-1 py-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                ref={allRef}
                type="checkbox"
                checked={selected.size === items.length && items.length > 0}
                onChange={toggleAll}
              />
              <span className="font-medium">전체 선택</span>
            </label>
          </li>

          <li className="border-t my-1" />

          {items.map(it => (
            <li key={it.id} className="px-1 py-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={selected.has(it.id)}
                  onChange={() => toggleItem(it.id)}
                />
                <span className="truncate">{it.label}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
