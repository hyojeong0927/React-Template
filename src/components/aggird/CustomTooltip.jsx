import { forwardRef } from 'react';
import './tooltip.module.css';

const CustomTooltip = forwardRef(function CustomTooltip(props, ref) {
  const { value } = props;
  return (
    <div ref={ref} className="custom-tooltip">
      {value || 'No Data'}
    </div>
  );
});

CustomTooltip.displayName = 'CustomTooltip'; // ESLint용

export default CustomTooltip;
