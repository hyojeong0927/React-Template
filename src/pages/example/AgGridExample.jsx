import { useMemo, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  AllCommunityModule,
  CheckboxEditorModule,
  ModuleRegistry,
  PaginationModule,
} from 'ag-grid-community';
import CustomTooltip from '../../components/aggird/CustomTooltip';
import {
  CompanyRenderer,
  CustomButton,
  PriceRenderer,
  DatePickerEditor,
  CustomPagination,
  PageSizeSelector,
} from '../../components/aggird';
import './grid.css';

ModuleRegistry.registerModules([
  AllCommunityModule,
  CheckboxEditorModule,
  PaginationModule,
]);

const generateRowData = () => [
  {
    athlete: 'Michael Phelps',
    company: 'https://www.usa-swimming.org',
    price: 300_000_000_000,
    country: 'USA',
    joinDate: '2008-08-08',
    gold: 8,
    silver: 0,
    bronze: 0,
    total: 8,
    boolean: true,
  },
  {
    athlete: 'Usain Bolt',
    company: 'https://www.jamaicaathletics.org',
    price: 15_000_000_000,
    country: 'Jamaica',
    joinDate: '2012-07-27',
    gold: 3,
    silver: 0,
    bronze: 0,
    total: 3,
    boolean: null,
  },
  {
    athlete: 'Simone Biles',
    company: '',
    price: 8_000_000_000,
    country: 'USA',
    joinDate: '2012-07-27',
    gold: 4,
    silver: 0,
    bronze: 1,
    total: 5,
    boolean: '',
  },
  {
    athlete: 'Michael Phelps',
    company: 'https://www.usa-swimming.org',
    price: 300_000_000_000,
    country: 'USA',
    joinDate: '2008-08-08',
    gold: 8,
    silver: 0,
    bronze: 0,
    total: 8,
    boolean: true,
  },
  {
    athlete: 'Usain Bolt',
    company: 'https://www.jamaicaathletics.org',
    price: 15_000_000_000,
    country: 'Jamaica',
    joinDate: '2012-07-27',
    gold: 3,
    silver: 0,
    bronze: 0,
    total: 3,
    boolean: null,
  },
  {
    athlete: 'Simone Biles',
    company: '',
    price: 8_000_000_000,
    country: 'USA',
    joinDate: '2012-07-27',
    gold: 4,
    silver: 0,
    bronze: 1,
    total: 5,
    boolean: '',
  },
  {
    athlete: 'Michael Phelps',
    company: 'https://www.usa-swimming.org',
    price: 300_000_000_000,
    country: 'USA',
    joinDate: '2008-08-08',
    gold: 8,
    silver: 0,
    bronze: 0,
    total: 8,
    boolean: true,
  },
  {
    athlete: 'Usain Bolt',
    company: 'https://www.jamaicaathletics.org',
    price: 15_000_000_000,
    country: 'Jamaica',
    joinDate: '2012-07-27',
    gold: 3,
    silver: 0,
    bronze: 0,
    total: 3,
    boolean: null,
  },
  {
    athlete: 'Simone Biles',
    company: '',
    price: 8_000_000_000,
    country: 'USA',
    joinDate: '2012-07-27',
    gold: 4,
    silver: 0,
    bronze: 1,
    total: 5,
    boolean: '',
  },
  {
    athlete: 'Michael Phelps',
    company: 'https://www.usa-swimming.org',
    price: 300_000_000_000,
    country: 'USA',
    joinDate: '2008-08-08',
    gold: 8,
    silver: 0,
    bronze: 0,
    total: 8,
    boolean: true,
  },
  {
    athlete: 'Usain Bolt',
    company: 'https://www.jamaicaathletics.org',
    price: 15_000_000_000,
    country: 'Jamaica',
    joinDate: '2012-07-27',
    gold: 3,
    silver: 0,
    bronze: 0,
    total: 3,
    boolean: null,
  },
  {
    athlete: 'Simone Biles',
    company: '',
    price: 8_000_000_000,
    country: 'USA',
    joinDate: '2012-07-27',
    gold: 4,
    silver: 0,
    bronze: 1,
    total: 5,
    boolean: '',
  },
  {
    athlete: 'Michael Phelps',
    company: 'https://www.usa-swimming.org',
    price: 300_000_000_000,
    country: 'USA',
    joinDate: '2008-08-08',
    gold: 8,
    silver: 0,
    bronze: 0,
    total: 8,
    boolean: true,
  },
  {
    athlete: 'Usain Bolt',
    company: 'https://www.jamaicaathletics.org',
    price: 15_000_000_000,
    country: 'Jamaica',
    joinDate: '2012-07-27',
    gold: 3,
    silver: 0,
    bronze: 0,
    total: 3,
    boolean: null,
  },
  {
    athlete: 'Simone Biles',
    company: '',
    price: 8_000_000_000,
    country: 'USA',
    joinDate: '2012-07-27',
    gold: 4,
    silver: 0,
    bronze: 1,
    total: 5,
    boolean: '',
  },
  {
    athlete: 'Michael Phelps',
    company: 'https://www.usa-swimming.org',
    price: 300_000_000_000,
    country: 'USA',
    joinDate: '2008-08-08',
    gold: 8,
    silver: 0,
    bronze: 0,
    total: 8,
    boolean: true,
  },
  {
    athlete: 'Usain Bolt',
    company: 'https://www.jamaicaathletics.org',
    price: 15_000_000_000,
    country: 'Jamaica',
    joinDate: '2012-07-27',
    gold: 3,
    silver: 0,
    bronze: 0,
    total: 3,
    boolean: null,
  },
  {
    athlete: 'Simone Biles',
    company: '',
    price: 8_000_000_000,
    country: 'USA',
    joinDate: '2012-07-27',
    gold: 4,
    silver: 0,
    bronze: 1,
    total: 5,
    boolean: '',
  },
  {
    athlete: 'Michael Phelps',
    company: 'https://www.usa-swimming.org',
    price: 300_000_000_000,
    country: 'USA',
    joinDate: '2008-08-08',
    gold: 8,
    silver: 0,
    bronze: 0,
    total: 8,
    boolean: true,
  },
  {
    athlete: 'Usain Bolt',
    company: 'https://www.jamaicaathletics.org',
    price: 15_000_000_000,
    country: 'Jamaica',
    joinDate: '2012-07-27',
    gold: 3,
    silver: 0,
    bronze: 0,
    total: 3,
    boolean: null,
  },
  {
    athlete: 'Simone Biles',
    company: '',
    price: 8_000_000_000,
    country: 'USA',
    joinDate: '2012-07-27',
    gold: 4,
    silver: 0,
    bronze: 1,
    total: 5,
    boolean: '',
  },
  {
    athlete: 'Michael Phelps',
    company: 'https://www.usa-swimming.org',
    price: 300_000_000_000,
    country: 'USA',
    joinDate: '2008-08-08',
    gold: 8,
    silver: 0,
    bronze: 0,
    total: 8,
    boolean: true,
  },
  {
    athlete: 'Usain Bolt',
    company: 'https://www.jamaicaathletics.org',
    price: 15_000_000_000,
    country: 'Jamaica',
    joinDate: '2012-07-27',
    gold: 3,
    silver: 0,
    bronze: 0,
    total: 3,
    boolean: null,
  },
  {
    athlete: 'Simone Biles',
    company: '',
    price: 8_000_000_000,
    country: 'USA',
    joinDate: '2012-07-27',
    gold: 4,
    silver: 0,
    bronze: 1,
    total: 5,
    boolean: '',
  },
];

export default function GridExample() {
  const gridRef = useRef(null);
  const [rowData] = useState(generateRowData());
  const [pageSize, setPageSize] = useState(2);

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
        field: 'company',
        editable: true,
        minWidth: '200',
        cellRenderer: CompanyRenderer,
      },
      { field: 'price', width: 180, cellRenderer: PriceRenderer },
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
  const [gridApi, setGridApi] = useState(null);
  const onGridReady = params => {
    console.log('Grid ready', params.api);
    setGridApi(params.api);
  };
  const [style, setStyle] = useState({ width: '100%', height: '50%' });
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
        <PageSizeSelector
          pageSize={pageSize}
          setPageSize={setPageSize}
          gridRef={gridRef}
        />
        <div style={style} className="ag-theme-alpine">
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
            defaultColDef={{
              tooltipComponent: 'customTooltip',
              sortable: true,
              resizable: true,
            }}
            singleClickEdit={true}
            rowSelection={{
              mode: 'multiRow',
              checkboxes: true,
              enableClickSelection: false,
            }}
            theme="legacy"
          />

          {gridApi && <CustomPagination gridApi={gridApi} />}
        </div>
      </div>
    </div>
  );
}
