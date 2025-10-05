import { useEffect, useRef } from 'react';

export default function Popup({ isOpen, onClose, title, children }) {
  const popupRef = useRef(null);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 열릴 때 포커스 이동
  useEffect(() => {
    if (isOpen && popupRef.current) {
      popupRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div
        ref={popupRef}
        tabIndex="-1"
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative outline-none"
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <h2 id="popup-title" className="text-lg font-bold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* 내용 */}
        <div className="popup-content">{children}</div>

        {/* 하단 버튼 */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
