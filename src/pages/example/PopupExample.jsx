import { useState } from 'react';
import Popup from '../../components/popup/Popup';

export default function PopupContent() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4 text-center">Popup 예제</h1>
      <button
        onClick={openPopup}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        팝업 열기
      </button>

      <Popup isOpen={isPopupOpen} onClose={closePopup} title="팝업 제목">
        <p>여기에 팝업 내용이 들어갑니다.</p>
        <p>원하는 컴포넌트를 자유롭게 넣을 수 있습니다.</p>
      </Popup>
    </div>
  );
}
