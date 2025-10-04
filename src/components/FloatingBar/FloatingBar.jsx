import { useEffect, useState } from 'react';

export default function FloatingBar({
  title,
  bottomBtn,
  children,
  position = 'bottom',
  onClose,
}) {
  const baseClasses =
    'fixed bg-gray-800 text-white shadow-lg z-50 flex flex-col p-4 rounded-md transition-transform transition-opacity duration-300 ease-in-out';

  const positionClasses = {
    top: 'top-0 left-0 w-full justify-center',
    bottom: 'bottom-0 left-0 w-full justify-center',
    side: 'top-1/2 right-0 transform -translate-y-1/2 h-auto justify-center',
  };

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY + 5) {
        setVisible(false); // 스크롤 다운 → 숨김
      } else if (window.scrollY < lastScrollY - 5) {
        setVisible(true); // 스크롤 업 → 표시
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const animationClasses = {
    top: visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
    bottom: visible
      ? 'translate-y-0 opacity-100'
      : 'translate-y-full opacity-0',
    side: visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
  };

  return (
    <div
      className={`${baseClasses} ${
        positionClasses[position] || positionClasses.bottom
      } ${animationClasses[position]}`}
      style={{
        transitionProperty: 'transform, opacity',
        transitionDuration: '300ms',
        transitionTimingFunction: 'ease-in-out',
      }}
    >
      {/* 헤더 */}
      <div className="floatingbar-header flex justify-between items-center mb-2">
        <span className="title text-lg font-bold">{title}</span>
        <button
          onClick={onClose}
          className="bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
        >
          창닫기
        </button>
      </div>

      {/* 콘텐츠 */}
      {children && (
        <div className="floatingbar-content mb-2">
          <div className="floatingbar-content__inner">{children}</div>
        </div>
      )}

      {/* 푸터 */}
      {bottomBtn && (
        <div className="floatingbar-footer flex justify-end">
          <div className="button-area space-x-2">{bottomBtn}</div>
        </div>
      )}
    </div>
  );
}
