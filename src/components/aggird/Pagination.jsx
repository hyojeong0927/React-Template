import { useState, useEffect } from 'react';

export default function CustomPagination({ gridApi }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!gridApi) return;

    const updatePagination = () => {
      setCurrentPage(gridApi.paginationGetCurrentPage() + 1);
      setTotalPages(gridApi.paginationGetTotalPages());
    };

    updatePagination();

    gridApi.addEventListener('paginationChanged', updatePagination);

    return () => {
      gridApi.removeEventListener('paginationChanged', updatePagination);
    };
  }, [gridApi]);

  if (!gridApi) return null;

  const goToPage = page => {
    gridApi.paginationGoToPage(page - 1);
  };
  const pageLimit = 10;

  let startPage = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1;
  let endPage = Math.min(startPage + pageLimit - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      style={{ display: 'flex', gap: 5, marginTop: 10, alignItems: 'center' }}
    >
      <button onClick={() => goToPage(1)} disabled={currentPage === 1}>
        ⏮ First
      </button>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ◀ Prev
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => goToPage(number)}
          style={{
            fontWeight: number === currentPage ? 'bold' : 'normal',
            backgroundColor: number === currentPage ? '#ddd' : 'transparent',
          }}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next ▶
      </button>
      <button
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last ⏭
      </button>
    </div>
  );
}
