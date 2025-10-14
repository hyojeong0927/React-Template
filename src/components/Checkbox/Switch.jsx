import { useState } from 'react';
import './switch.css';

export default function Switch({
  checked = false,
  onChange,
  disabled = false,
}) {
  const [isOn, setIsOn] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    const next = !isOn;
    setIsOn(next);
    onChange?.(next);
  };

  const handleKeyDown = e => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault(); // 스크롤 방지
      handleToggle();
    }
  };

  return (
    <div
      className={`switch ${isOn ? 'on' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      role="switch"
      aria-checked={isOn}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0} // disabled면 포커스 안되게
    >
      <div className="thumb" />
    </div>
  );
}
