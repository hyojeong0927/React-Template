import { useMemo, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import './grid.css';
import CustomTooltip from '../../components/aggird/CustomTooltip';
import {
  CompanyRenderer,
  CustomButton,
  PriceRenderer,
} from '../../components/aggird';

// AG Grid 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);

export default function GridExample() {
  const gridRef = useRef(null);

  const columnDefs = useMemo(
    () => [
      {
        field: 'athlete',
        width: 150,
        tooltipField: 'athlete',
        cellStyle: params =>
          params.value === 'Usain Bolt'
            ? { color: 'red', backgroundColor: 'green' }
            : null,
      },
      { field: 'company', width: 200, cellRenderer: CompanyRenderer },
      { field: 'price', width: 180, cellRenderer: PriceRenderer },
      {
        headerName: 'Action',
        field: 'action',
        width: 300,
        cellRenderer: CustomButton,
      },
      {
        field: 'gold',
        width: 100,
        cellClassRules: {
          'rag-green-outer': params => params.value === 8,
          'rag-blue-outer': params => params.value === 3,
          'rag-red-outer': params => params.value === 4,
        },
      },
      { field: 'silver', width: 100 },
      { field: 'bronze', width: 100 },
      { field: 'total', width: 100 },
    ],
    [],
  );

  const rowData = useMemo(
    () => [
      {
        athlete: 'Michael Phelps',
        company: 'https://www.usa-swimming.org',
        price: 300_000_000_000,
        gold: 8,
        silver: 0,
        bronze: 0,
        total: 8,
      },
      {
        athlete: 'Usain Bolt',
        company: 'https://www.jamaicaathletics.org',
        price: 15_000_000_000,
        gold: 3,
        silver: 0,
        bronze: 0,
        total: 3,
      },
      {
        athlete: 'Simone Biles',
        company: '',
        price: 8_000_000_000,
        gold: 4,
        silver: 0,
        bronze: 1,
        total: 5,
      },
    ],
    [],
  );

  const [style, setStyle] = useState({ width: '100%', height: '100%' });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return <div style={{ padding: 20 }}>Loading...</div>;

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
          400 x 400
        </button>
      </div>

      <div className="grid-wrapper">
        <div style={style} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            pagination
            animateRows
            tooltipShowDelay={300}
            tooltipHideDelay={3000}
            tooltipMouseTrack={true}
            popupParent={document.body}
            components={{
              customTooltip: CustomTooltip,
            }}
            defaultColDef={{
              tooltipComponent: 'customTooltip',
              sortable: true,
              resizable: true,
            }}
            theme="legacy" // Quartz 없이 legacy 사용
          />
        </div>
      </div>
    </div>
  );
}
