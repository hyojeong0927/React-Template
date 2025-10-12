import { useEffect } from 'react';
import { useMultiBottomSheet } from '../../components/bottomsheet';

export default function BottomSheetMultiExample() {
  const { openBottomSheet } = useMultiBottomSheet();

  useEffect(() => {
    openBottomSheet(
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Sheet 1</h2>
        {[...Array(10)].map((_, i) => (
          <p key={i}>Item {i + 1}</p>
        ))}
      </div>,
      { snapPoints: [200, 400, 600], peekHeight: 60 },
    );

    openBottomSheet(
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Sheet 2</h2>
        {[...Array(15)].map((_, i) => (
          <p key={i}>Item {i + 1}</p>
        ))}
      </div>,
      { snapPoints: [250, 450, 650], peekHeight: 56 },
    );

    openBottomSheet(
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Sheet 3</h2>
        {[...Array(20)].map((_, i) => (
          <p key={i}>Item {i + 1}</p>
        ))}
      </div>,
      { snapPoints: [300, 500, 700], peekHeight: 60 },
    );
  }, [openBottomSheet]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Multi BottomSheet Example</h1>
      <p>여러 BottomSheet가 동시에 peek 상태로 표시되고 drag 가능합니다.</p>
    </div>
  );
}
