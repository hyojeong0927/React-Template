import { useState, useRef, useEffect } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from 'date-fns';

import ko from 'date-fns/locale/ko';

export default function Datepicker({
  id,
  label,
  value,
  onChange,
  placeholder = '날짜를 선택하세요',
  required = false,
  disabled = false,
  className = '',
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null,
  );
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date(),
  );
  const ref = useRef(null);

  // 📅 날짜 선택 시
  const handleDateClick = day => {
    setSelectedDate(day);
    onChange?.(format(day, 'yyyy-MM-dd'));
    setShowCalendar(false);
  };

  // 📆 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 📅 달력 날짜 생성
  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isToday = isSameDay(day, new Date());
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        const isNotCurrentMonth = !isSameMonth(day, monthStart);

        days.push(
          <div
            key={day}
            className={`text-center py-1 rounded-md cursor-pointer 
              ${isSelected ? 'bg-blue-500 text-white' : isToday ? 'bg-blue-100' : ''}
              ${isNotCurrentMonth ? 'text-gray-400' : 'text-gray-800'}
              hover:bg-blue-200`}
            onClick={() => handleDateClick(cloneDay)}
          >
            {format(day, 'd')}
          </div>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day}>
          {days}
        </div>,
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className={`datepicker-wrapper relative ${className}`} ref={ref}>
      {label && (
        <label htmlFor={id} className="block mb-1 font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* 입력창 */}
      <div className="relative">
        <input
          id={id}
          type="text"
          value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
          onClick={() => !disabled && setShowCalendar(!showCalendar)}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          className={`border rounded-md p-2 w-full cursor-pointer bg-white ${disabled ? 'opacity-50' : ''}`}
          aria-haspopup="dialog"
          aria-expanded={showCalendar}
          aria-label={label}
        />
        <span
          className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
          onClick={() => !disabled && setShowCalendar(!showCalendar)}
        >
          📅
        </span>
      </div>

      {/* 달력 팝업 */}
      {showCalendar && (
        <div
          className="absolute z-10 mt-1 p-3 bg-white border rounded-lg shadow-lg w-72"
          role="dialog"
          aria-modal="true"
        >
          {/* 상단 월 이동 */}
          <div className="flex justify-between items-center mb-2">
            <button
              type="button"
              className="p-1 text-gray-600 hover:text-black"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              aria-label="이전 달"
            >
              ◀
            </button>
            <span className="font-semibold">
              {format(currentMonth, 'yyyy년 M월', { locale: ko })}
            </span>
            <button
              type="button"
              className="p-1 text-gray-600 hover:text-black"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              aria-label="다음 달"
            >
              ▶
            </button>
          </div>

          {/* 요일 */}
          <div className="grid grid-cols-7 gap-1 text-center font-medium border-b pb-1 mb-1 text-gray-600 text-sm">
            {['일', '월', '화', '수', '목', '금', '토'].map(day => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* 날짜 */}
          {renderDays()}
        </div>
      )}
    </div>
  );
}
