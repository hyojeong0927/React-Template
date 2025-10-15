import { useEffect, useRef } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';

export default function DatePickerEditor({ value, onValueChange }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const input = containerRef.current.querySelector('input');
      if (input) input.focus();
    }
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={value ? dayjs(value) : null}
          onChange={date =>
            onValueChange(date ? date.format('YYYY-MM-DD') : '')
          }
          slotProps={{
            textField: {
              size: 'small',
              variant: 'standard',
              fullWidth: true,
              sx: { fontSize: '14px' },
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
