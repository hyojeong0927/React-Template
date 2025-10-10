import { useState } from 'react';
import { parse, isAfter, isBefore } from 'date-fns';

export default function DateRangePicker({
  label = '기간 선택',
  startDate: initialStart = '',
  endDate: initialEnd = '',
  onChange,
  disabled = false,
  required = false,
}) {
  const [startDate, setStartDate] = useState(initialStart);
  const [endDate, setEndDate] = useState(initialEnd);
  const [error, setError] = useState('');

  const handleStartChange = e => {
    const newStart = e.target.value;
    setStartDate(newStart);

    // 종료일보다 이후면 에러 처리
    if (
      endDate &&
      isAfter(
        parse(newStart, 'yyyy-MM-dd', new Date()),
        parse(endDate, 'yyyy-MM-dd', new Date()),
      )
    ) {
      setError('시작일은 종료일보다 이후일 수 없습니다.');
    } else {
      setError('');
      onChange?.({ startDate: newStart, endDate });
    }
  };

  const handleEndChange = e => {
    const newEnd = e.target.value;
    setEndDate(newEnd);

    // 시작일보다 이전이면 에러 처리
    if (
      startDate &&
      isBefore(
        parse(newEnd, 'yyyy-MM-dd', new Date()),
        parse(startDate, 'yyyy-MM-dd', new Date()),
      )
    ) {
      setError('종료일은 시작일보다 이전일 수 없습니다.');
    } else {
      setError('');
      onChange?.({ startDate, endDate: newEnd });
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-gray-700 font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="flex items-center gap-2">
        <input
          type="date"
          value={startDate}
          onChange={handleStartChange}
          disabled={disabled}
          className="border rounded-md px-3 py-2 w-40 focus:ring-2 focus:ring-blue-400"
          aria-label="시작일"
        />

        <span>~</span>

        <input
          type="date"
          value={endDate}
          onChange={handleEndChange}
          disabled={disabled}
          className="border rounded-md px-3 py-2 w-40 focus:ring-2 focus:ring-blue-400"
          aria-label="종료일"
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
