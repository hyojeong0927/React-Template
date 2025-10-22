import './tooltip.module.css';

export default function CustomTooltip({ value, colDef }) {
  return (
    <div
      style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '6px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      }}
    >
      <strong>{colDef.headerName}</strong>
      <div>{value}</div>
    </div>
  );
}
