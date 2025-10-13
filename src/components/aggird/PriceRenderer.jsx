import React from 'react';

/**
 * 가격 렌더러 (콤마 포맷 + 억 단위 표시)
 */
const PriceRenderer = React.memo(({ value }) => {
  if (value == null) return null;

  const formatted =
    value >= 100000000
      ? `${(value / 100000000).toFixed(1)}억`
      : value.toLocaleString();

  return (
    <span
      style={{
        color: value > 10000000000 ? 'green' : 'black',
        fontWeight: value > 10000000000 ? 'bold' : 'normal',
      }}
    >
      {formatted}
    </span>
  );
});

PriceRenderer.displayName = 'PriceRenderer';
export default PriceRenderer;
