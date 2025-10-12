import { useState } from 'react';
import BottomSheet from '../../components/popup/PopupBottomSheet';

export default function PopupBottomSheet() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>팝업 열기</button>
      <BottomSheet
        isOpen={open}
        onClose={() => setOpen(false)}
        snapPoints={[30, 300, 600]} // 닫힘 30px, 중간 300, 전체 600
      >
        <div className="bottom-sheet__header">밀어 올리는 버튼 위치</div>
        <div className="bottom-sheet__content">
          <h3>Bottom Sheet (닫힘 시 30px만 노출)</h3>
          <p>닫힘 상태에서도 하단이 항상 보여 스와이프 가능!</p>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>내용 {i + 1}</p>
          ))}
        </div>
        <div className="bottom-sheet__footer">
          <button onClick={() => setOpen(false)}>닫기</button>
        </div>
      </BottomSheet>
    </div>
  );
}
