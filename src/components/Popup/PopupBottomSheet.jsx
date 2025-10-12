import { useState, useRef, useEffect, useCallback } from 'react';

export default function BottomSheet({
  isOpen,
  onClose,
  snapPoints = [30, 300, 600],
  children,
}) {
  const sheetRef = useRef(null);
  const startYRef = useRef(0);
  const lastTranslateYRef = useRef(snapPoints[snapPoints.length - 1]);
  const draggingRef = useRef(false);

  const [translateY, setTranslateY] = useState(
    snapPoints[snapPoints.length - 1],
  );
  const [transitionEnabled, setTransitionEnabled] = useState(false);

  // 열기/닫기 처리
  useEffect(() => {
    if (isOpen) {
      setTransitionEnabled(false);
      setTranslateY(snapPoints[0]);
      lastTranslateYRef.current = snapPoints[0];

      const timer = requestAnimationFrame(() => {
        setTransitionEnabled(true);
        setTranslateY(snapPoints[1]);
        lastTranslateYRef.current = snapPoints[1];
      });

      return () => cancelAnimationFrame(timer);
    } else {
      setTransitionEnabled(true);
      setTranslateY(snapPoints[snapPoints.length - 1]);
      lastTranslateYRef.current = snapPoints[snapPoints.length - 1];
    }
  }, [isOpen, snapPoints]);

  // 드래그 공통 함수
  const handleDragStart = useCallback(
    clientY => {
      draggingRef.current = true;
      startYRef.current = clientY;
      setTransitionEnabled(false);

      const handleMouseMove = e => {
        if (!draggingRef.current) return;
        const deltaY = e.clientY - startYRef.current;
        const newTranslate = Math.min(
          snapPoints[snapPoints.length - 1],
          Math.max(snapPoints[0], lastTranslateYRef.current + deltaY),
        );
        setTranslateY(newTranslate);
      };

      const handleMouseUp = () => {
        if (!draggingRef.current) return;
        draggingRef.current = false;
        setTransitionEnabled(true);

        const closest = snapPoints.reduce((prev, curr) =>
          Math.abs(curr - translateY) < Math.abs(prev - translateY)
            ? curr
            : prev,
        );

        setTranslateY(closest);
        lastTranslateYRef.current = closest;

        if (closest === snapPoints[snapPoints.length - 1] && onClose) onClose();

        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [translateY, snapPoints, onClose],
  );

  const handleDragMove = useCallback(
    clientY => {
      if (!draggingRef.current) return;
      const deltaY = clientY - startYRef.current;
      const newTranslate = Math.min(
        snapPoints[snapPoints.length - 1],
        Math.max(snapPoints[0], lastTranslateYRef.current + deltaY),
      );
      setTranslateY(newTranslate);
    },
    [snapPoints],
  );

  const handleDragEnd = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setTransitionEnabled(true);

    const closest = snapPoints.reduce((prev, curr) =>
      Math.abs(curr - translateY) < Math.abs(prev - translateY) ? curr : prev,
    );

    setTranslateY(closest);
    lastTranslateYRef.current = closest;

    if (closest === snapPoints[snapPoints.length - 1] && onClose) onClose();
  }, [translateY, snapPoints, onClose]);

  return (
    <>
      {isOpen && onClose && (
        <div
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 999,
          }}
        />
      )}

      <div
        ref={sheetRef}
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          background: '#fff',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          transform: `translateY(${translateY}px)`,
          transition: transitionEnabled
            ? 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
            : 'none',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '100%',
          cursor: draggingRef.current ? 'grabbing' : 'grab',
        }}
        onTouchStart={e => handleDragStart(e.touches[0].clientY)}
        onTouchMove={e => handleDragMove(e.touches[0].clientY)}
        onTouchEnd={handleDragEnd}
        onMouseDown={e => handleDragStart(e.clientY)}
      >
        <div
          style={{
            width: '40px',
            height: '4px',
            background: '#ccc',
            borderRadius: '2px',
            margin: '10px auto',
          }}
        />
        <div style={{ overflowY: 'auto', flex: 1 }}>{children}</div>
      </div>
    </>
  );
}
