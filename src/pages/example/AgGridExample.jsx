import { useMemo, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import './grid.css';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function GridExample() {
  const gridRef = useRef(null);

  // 컬럼 정의
  const columnDefs = useMemo(
    () => [
      { field: 'athlete', width: 150 },
      { field: 'age', width: 90 },
      { field: 'country', width: 150 },
      { field: 'year', width: 90 },
      { field: 'date', width: 150 },
      { field: 'sport', width: 150 },
      { field: 'gold', width: 100 },
      { field: 'silver', width: 100 },
      { field: 'bronze', width: 100 },
      { field: 'total', width: 100 },
    ],
    [],
  );

  // 내부 데이터
  const data = [
    {
      athlete: 'Michael Phelps',
      age: 23,
      country: 'USA',
      year: 2008,
      date: '24/08/2008',
      sport: 'Swimming',
      gold: 8,
      silver: 0,
      bronze: 0,
      total: 8,
    },
    {
      athlete: 'Usain Bolt',
      age: 22,
      country: 'Jamaica',
      year: 2008,
      date: '24/08/2008',
      sport: 'Athletics',
      gold: 3,
      silver: 0,
      bronze: 0,
      total: 3,
    },
    {
      athlete: 'Simone Biles',
      age: 19,
      country: 'USA',
      year: 2016,
      date: '21/08/2016',
      sport: 'Gymnastics',
      gold: 4,
      silver: 0,
      bronze: 1,
      total: 5,
    },
  ];

  // 그리드 스타일 상태
  const [style, setStyle] = useState({ width: '100%', height: '100%' });

  // 스타일 로드 후 렌더링
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return <div style={{ padding: 20 }}>Loading...</div>;

  // 버튼 핸들러
  const setWidthAndHeight = (width, height) => setStyle({ width, height });

  return (
    <div className="example-wrapper">
      <div style={{ marginBottom: '5px' }}>
        <button onClick={() => setWidthAndHeight('100%', '100%')}>
          Fill 100%
        </button>
        <button onClick={() => setWidthAndHeight('60%', '60%')}>
          Fill 60%
        </button>
        <button onClick={() => setWidthAndHeight('400px', '400px')}>
          Exactly 400 x 400
        </button>
      </div>
      <div className="grid-wrapper">
        <div style={style} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={data}
            columnDefs={columnDefs}
            pagination
            theme="legacy"
          />
        </div>
      </div>
    </div>
  );
}
