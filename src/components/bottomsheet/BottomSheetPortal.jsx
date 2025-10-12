import { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export default function BottomSheetPortal({
  children,
  snapPoints = [200, 400, 600],
  peekHeight = 56,
}) {
  const snaps = Array.from(new Set([...snapPoints].sort((a, b) => a - b)));
  const sheetRef = useRef(null);
  const startYRef = useRef(0);
  const startTranslateRef = useRef(0);
  const draggingRef = useRef(false);

  const [vh, setVh] = useState(window.innerHeight);
  const [translateY, setTranslateY] = useState(vh - peekHeight);

  const [portalRoot] = useState(() => {
    let existing = document.getElementById('bottom-sheet-root');
    if (existing) return existing;
    const root = document.createElement('div');
    root.id = 'bottom-sheet-root';
    document.body.appendChild(root);
    return root;
  });

  // resize
  useEffect(() => {
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // drag start
  const handlePointerDown = useCallback(
    e => {
      draggingRef.current = true;
      startYRef.current = e.touches ? e.touches[0].clientY : e.clientY;
      startTranslateRef.current = translateY;
      document.body.style.touchAction = 'none';
    },
    [translateY],
  );

  // drag move
  const handlePointerMove = useCallback(
    e => {
      if (!draggingRef.current) return;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const delta = clientY - startYRef.current;
      const newY = Math.min(
        vh,
        Math.max(
          vh - snaps[snaps.length - 1],
          startTranslateRef.current + delta,
        ),
      );
      setTranslateY(newY);
    },
    [vh, snaps],
  );

  // snap
  const snapToNearest = useCallback(
    ty => {
      const distances = snaps.map(s => Math.abs(ty - (vh - s)));
      const idx = distances.indexOf(Math.min(...distances));
      return { translate: vh - snaps[idx] };
    },
    [snaps, vh],
  );

  // drag end
  const handlePointerUp = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    document.body.style.touchAction = '';

    const { translate } = snapToNearest(translateY);
    setTranslateY(translate);
  }, [translateY, snapToNearest]);

  // global events
  useEffect(() => {
    const move = e => handlePointerMove(e);
    const up = () => handlePointerUp();
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
  }, [handlePointerMove, handlePointerUp]);

  const sheetHeight = Math.max(0, vh - translateY);
  const headerHeight = 56;
  const contentHeight = Math.max(0, sheetHeight - headerHeight);

  const style = {
    top: translateY,
    left: 0,
    right: 0,
    height: sheetHeight,
    position: 'fixed',
    transition: draggingRef.current
      ? 'none'
      : 'top 0.25s cubic-bezier(.25,.8,.25,1)',
    zIndex: 50,
  };

  const sheet = (
    <div
      ref={sheetRef}
      className="w-full max-w-3xl bg-white rounded-t-2xl shadow-xl overflow-hidden"
      style={style}
    >
      {/* Grab bar */}
      <div
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        className="w-full flex flex-col items-center cursor-grab select-none py-2"
      >
        <div className="w-10 h-1.5 rounded-full bg-gray-300" />
      </div>

      {/* Header */}
      <div className="w-full px-4 pb-2 flex items-center justify-between">
        <div className="text-sm font-medium">BottomSheet</div>
      </div>

      {/* Content */}
      <div className="overflow-auto" style={{ height: contentHeight }}>
        {children}
      </div>
    </div>
  );

  return createPortal(sheet, portalRoot);
}
