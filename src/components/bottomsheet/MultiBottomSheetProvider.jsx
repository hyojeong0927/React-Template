import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react';
import BottomSheetPortal from './BottomSheetPortal';

const MultiBottomSheetContext = createContext(null);

export function MultiBottomSheetProvider({ children }) {
  const [sheets, setSheets] = useState([]);
  const idRef = useRef(0); // 고유 ID용 카운터

  const openBottomSheet = useCallback((content, opts = {}) => {
    idRef.current += 1;
    const id = idRef.current;

    setSheets(prev => [
      ...prev,
      {
        id,
        content,
        options: {
          snapPoints: [200, 400, 600],
          peekHeight: 56,
          ...opts,
        },
      },
    ]);

    return id;
  }, []);

  const closeBottomSheet = useCallback(id => {
    setSheets(prev => prev.filter(sheet => sheet.id !== id));
  }, []);

  return (
    <MultiBottomSheetContext.Provider
      value={{ openBottomSheet, closeBottomSheet }}
    >
      {children}
      {sheets.map(sheet => (
        <BottomSheetPortal
          key={sheet.id}
          isOpen={true}
          onClose={() => closeBottomSheet(sheet.id)}
          {...sheet.options}
        >
          {sheet.content}
        </BottomSheetPortal>
      ))}
    </MultiBottomSheetContext.Provider>
  );
}

// Hook
// eslint-disable-next-line react-refresh/only-export-components
export function useMultiBottomSheet() {
  const context = useContext(MultiBottomSheetContext);
  if (!context)
    throw new Error(
      'useMultiBottomSheet must be used within MultiBottomSheetProvider',
    );
  return context;
}
