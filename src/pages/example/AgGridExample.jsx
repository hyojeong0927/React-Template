import { useMemo, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

// Grid Renderer, Editor Components
import {
  CompanyRenderer,
  CustomButton,
  CustomPagination,
  CustomTooltip,
  DatePickerEditor,
  PageSizeSelector,
  PriceRenderer,
} from '@/components/aggird';
import '@/components/aggird/gridModules';
import { getDefaultColDef } from '@/utils/gridDefaultColDef';

// Data
import { rowData } from '@/data/rowData';

// Style
import './grid.css';

// rowspan 병합 대상 필드
const mergeFields = ['athlete', 'company'];

export default function GridExample() {
  // 상태 정의
  const gridRef = useRef(null);
  const [gridApi, setGridApi] = useState(null);
  const [pageSize, setPageSize] = useState(2);
  const [style, setStyle] = useState({ width: '100%', height: '50%' });
  const [ready, setReady] = useState(false);

  /** 공통 defaultColDef */
  const defaultColDef = useMemo(() => getDefaultColDef(mergeFields), []);

  // 컬럼 정의
  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Athlete',
        field: 'athlete',
        editable: true,
        width: 150,
        tooltipField: 'athlete',
        cellStyle: params =>
          params.value === 'Usain Bolt'
            ? { color: 'red', backgroundColor: 'green' }
            : null,
      },

      {
        headerName: 'Column Group',
        minWidth: '200',
        children: [
          { field: 'company', editable: true, cellRenderer: CompanyRenderer },
          { field: 'price', width: 180, cellRenderer: PriceRenderer },
        ],
      },
      {
        headerName: 'Selectbox',
        field: 'country',
        width: 100,
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['USA', 'Jamaica', 'Korea', 'Japan', 'UK'],
        },
      },
      {
        headerName: 'Datepicker',
        field: 'joinDate',
        width: 160,
        editable: true,
        cellEditor: 'datePickerEditor',
      },
      {
        headerName: 'Action',
        field: 'action',
        width: 300,
        cellRenderer: CustomButton,
      },
      {
        field: 'gold',
        editable: true,
        width: 100,
        cellClassRules: {
          'rag-green-outer': params => params.value === 8,
          'rag-blue-outer': params => params.value === 3,
          'rag-red-outer': params => params.value === 4,
        },
      },
      {
        field: 'silver',
        editable: true,
        cellEditor: 'agNumberCellEditor',
        cellEditorParams: {
          min: 0,
          max: 100,
        },
        width: 100,
      },
      {
        field: 'bronze',
        editable: true,
        cellEditor: 'agNumberCellEditor',
        cellEditorParams: {
          min: 0,
          max: 100,
        },
        width: 100,
      },
      {
        field: 'total',
        editable: true,
        cellEditor: 'agNumberCellEditor',
        cellEditorParams: {
          min: 0,
          max: 100,
        },
        width: 100,
      },
      {
        headerName: 'Checkbox Cell Editor',
        field: 'boolean',
        editable: true,
        cellEditor: 'agCheckboxCellEditor',
      },
    ],
    [],
  );

  // 이벤트 핸들러
  const onGridReady = params => {
    console.log('Grid ready', params.api);
    setGridApi(params.api);
  };
  const setWidthAndHeight = (width, height) => setStyle({ width, height });

  // useEffect
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  // loading
  if (!ready) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div className="example-wrapper">
      <div style={{ marginBottom: '5px' }}>
        <button onClick={() => setWidthAndHeight('100%', '50%')}>
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
        {/* Page View */}
        <PageSizeSelector
          pageSize={pageSize}
          setPageSize={setPageSize}
          gridRef={gridRef}
        />
        <div style={style} className="ag-theme-alpine">
          {/* Grid */}
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows
            tooltipShowDelay={300}
            tooltipHideDelay={3000}
            tooltipMouseTrack={true}
            suppressPaginationPanel={true}
            pagination={true}
            paginationPageSize={pageSize}
            onGridReady={onGridReady}
            popupParent={document.body}
            components={{
              customTooltip: CustomTooltip,
              datePickerEditor: DatePickerEditor,
            }}
            defaultColDef={defaultColDef}
            singleClickEdit={true}
            rowSelection={{
              mode: 'multiRow',
              checkboxes: true,
              enableClickSelection: false,
            }}
            suppressRowTransform={true}
            theme="legacy"
          />
          {/* Pagination */}
          {gridApi && <CustomPagination gridApi={gridApi} />}
        </div>
      </div>
    </div>
  );
}
