import { useState } from 'react';
import FloatingBar from '../../components/FloatingBar/FloatingBar';

export default function FloatingBarExample() {
  const [barPosition, setBarPosition] = useState(null);

  return (
    <div style={{ height: '2000px' }} className="relative">
      <h1 className="p-4">Floating Bar 예시 (측면 최적화 애니메이션)</h1>

      <div className="space-x-2 mb-4">
        <button
          onClick={() => setBarPosition('top')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          플로팅바 top 보기
        </button>
        <button
          onClick={() => setBarPosition('side')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          플로팅바 side 보기
        </button>
        <button
          onClick={() => setBarPosition('bottom')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          플로팅바 bottom 보기
        </button>
      </div>

      {barPosition && (
        <FloatingBar
          position={barPosition}
          title={`${barPosition.charAt(0).toUpperCase() + barPosition.slice(1)} Bar`}
          onClose={() => setBarPosition(null)}
          bottomBtn={
            <>
              <button className="bg-blue-500 px-3 py-1 rounded">확인</button>
              <button className="bg-red-500 px-3 py-1 rounded">취소</button>
            </>
          }
        >
          스크롤 방향에 따라 나타났다 사라지는 {barPosition} 플로팅 바입니다.
        </FloatingBar>
      )}
    </div>
  );
}
