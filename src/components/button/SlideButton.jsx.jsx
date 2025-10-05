import { useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function SlideButton() {
  const objectRef = useRef(null);
  const x = useMotionValue(0);

  const handleDrag = () => {
    if (objectRef.current) {
      objectRef.current.style.transform = `translateX(${x.get()}px)`;
    }
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 150) {
      console.log('슬라이드 완료!');
      if (objectRef.current) {
        objectRef.current.style.backgroundColor = '#34D399';
      }
    }

    // 버튼과 오브젝트 초기화
    x.set(0, { type: 'spring', stiffness: 300, damping: 20 });
    if (objectRef.current) {
      objectRef.current.style.transform = `translateX(0px)`;
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-8 h-500 bg-gray-50">
      {/* 움직이는 오브젝트 */}
      <div
        ref={objectRef}
        className="object w-24 h-24 bg-red-400 rounded-lg shadow-md"
      ></div>

      {/* 슬라이드 버튼 */}
      <div className="relative w-64 h-12 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white cursor-pointer"
          drag="x"
          dragConstraints={{ left: 0, right: 200 }}
          dragElastic={0.1}
          style={{ x }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          ▶
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center text-gray-500 pointer-events-none">
          밀어서 움직이기
        </div>
      </div>
    </div>
  );
}
