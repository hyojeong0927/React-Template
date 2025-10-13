import React, { useCallback } from 'react';

/**
 * 버튼 렌더러
 * 각 행의 company 값을 참조하여 동작
 */
const CustomButton = React.memo(({ data }) => {
  const handleClick = useCallback(() => {
    console.log(`Software Launched: ${data?.company || 'Unknown Company'}`);
    alert(`Launching: ${data?.company || 'Unknown'}`);
  }, [data]);

  if (!data) return null;

  return (
    <button
      onClick={handleClick}
      style={{
        background: '#0078d7',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '6px 10px',
        cursor: 'pointer',
      }}
    >
      {data.company ? `Launch ${new URL(data.company).hostname}` : 'Launch!'}
    </button>
  );
});

CustomButton.displayName = 'CustomButton';
export default CustomButton;
