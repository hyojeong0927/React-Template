export default function PageSizeSelector({
  pageSize,
  setPageSize,
  options = [2, 3, 10],
  gridRef,
}) {
  const handleChange = e => {
    const value = Number(e.target.value);
    setPageSize(value);

    const api = gridRef?.current?.api;
    if (api) {
      api.paginationSetPageSize
        ? api.paginationSetPageSize(value) // 엔터프라이즈용
        : api.paginationGoToPage(0); // 커뮤니티에서는 그냥 페이지를 0으로 이동
    }
  };

  return (
    <div style={{ marginBottom: '5px' }}>
      Page Size:
      <select
        value={pageSize}
        onChange={handleChange}
        style={{ marginLeft: '5px' }}
      >
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
