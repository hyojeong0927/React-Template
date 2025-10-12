import { useState, useMemo } from 'react';
import { menu00, menu01, menu02, filters } from './data';

export default function PublishStatus() {
  const mergedData = useMemo(() => {
    return [...menu00, ...menu01, ...menu02].map(row => ({
      ...row,
      history: Array.isArray(row.history)
        ? row.history
        : row.history
          ? [row.history]
          : [],
    }));
  }, []);

  const [selectedFilters, setSelectedFilters] = useState(
    Object.fromEntries(
      filters.map(f => [
        f.label,
        f.options.includes('전체') ? '전체' : f.options[0],
      ]),
    ),
  );

  const [sortKey, setSortKey] = useState('no');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleFilterChange = (label, value) => {
    setSelectedFilters(prev => ({ ...prev, [label]: value }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const matchesFilter = (row, filter) => {
    const selected = selectedFilters[filter.label];
    if (selected === '전체') return true;

    const map = {
      진행상태: row.status,
      Category: row.depth1,
      '퍼블 시작일': row.startDate,
      수정일: row.modifiedDate,
      '디자인 유무': row.hasDesign,
      '개발 시작일': row.devStartDate,
    };
    return map[filter.label] === selected;
  };

  const filteredData = useMemo(() => {
    return mergedData.filter(row => filters.every(f => matchesFilter(row, f)));
  }, [mergedData, matchesFilter]);

  const sortValues = (a, b, key) => {
    const aVal = a[key];
    const bVal = b[key];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal, 'ko');
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return aVal - bVal;
    }
    return 0;
  };

  const sortedData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) => sortValues(a, b, sortKey));
    return sortOrder === 'asc' ? sorted : sorted.reverse();
  }, [filteredData, sortKey, sortOrder]);

  const handleSort = key => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const latestModifiedDate = useMemo(() => {
    const dates = filteredData
      .map(d => d.modifiedDate)
      .filter(Boolean)
      .map(d => new Date(d));

    if (dates.length === 0) return '-';
    const latest = new Date(Math.max(...dates.map(d => d.getTime())));
    return latest.toLocaleDateString('ko-KR');
  }, [filteredData]);

  const summary = useMemo(() => {
    const total = filteredData.length;
    const statuses = ['진행대기', '진행중', '완료', '보류', '제외'];
    return [
      { label: '전체', count: total },
      ...statuses.map(status => {
        const count = filteredData.filter(d => d.status === status).length;
        return {
          label: status,
          count,
          latestModifiedDate,
          percent: total ? Math.round((count / total) * 100) : 0,
        };
      }),
      { label: '수정', count: filteredData.filter(d => d.modifiedDate).length },
      { label: '표시된', count: total },
    ];
  }, [filteredData, latestModifiedDate]);

  const columns = useMemo(
    () => [
      { label: 'No', key: 'no' },
      { label: 'ID', key: 'id' },
      { label: 'Depth 01', key: 'depth1' },
      { label: 'Depth 02', key: 'depth2' },
      { label: 'Depth 03', key: 'depth3' },
      { label: 'Type', key: 'type' },
      { label: 'Folder', key: 'folder' },
      { label: 'File name', key: 'fileName' },
      { label: '진행상태', key: 'status' },
      { label: '시작일', key: 'startDate' },
      { label: '완료일', key: 'endDate' },
      { label: '수정일', key: 'modifiedDate' },
      { label: '디자인 유무', key: 'hasDesign' },
      { label: '개발시작일', key: 'devStartDate' },
      { label: 'History', key: 'history' },
    ],
    [],
  );

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">퍼블 현황</h1>

      {/* 필터 */}
      <section className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-4">
        {filters.map(filter => (
          <div key={filter.label} className="flex items-center gap-2">
            <span className="text-sm font-medium">{filter.label}</span>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={selectedFilters[filter.label]}
              onChange={e => handleFilterChange(filter.label, e.target.value)}
            >
              {filter.options.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </section>

      {/* 요약 */}
      <section className="bg-white p-4 rounded-lg shadow grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {summary.map(item => (
          <div key={item.label} className="text-sm font-medium">
            {item.label} {item.count}
            {item.percent !== undefined && `건(${item.percent}%)`}
          </div>
        ))}
        <div className="text-sm font-medium">
          최신 수정일 {latestModifiedDate}
        </div>
      </section>

      {/* 테이블 */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b cursor-pointer"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  {sortKey === col.key && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map(row => (
                <tr key={row.no} className="hover:bg-gray-50">
                  {columns.map(col => (
                    <td key={col.key} className="px-3 py-2 text-sm">
                      {col.key === 'fileName' ? (
                        <a
                          href={row.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {row.fileName}
                        </a>
                      ) : col.key === 'status' ? (
                        <span
                          className={`px-2 py-1 rounded text-white text-xs ${
                            row.status === '완료'
                              ? 'bg-green-500'
                              : row.status === '진행중'
                                ? 'bg-blue-500'
                                : row.status === '진행대기'
                                  ? 'bg-yellow-500'
                                  : 'bg-gray-400'
                          }`}
                        >
                          {row.status}
                        </span>
                      ) : col.key === 'history' ? (
                        Array.isArray(row.history) && row.history.length > 0 ? (
                          <details className="cursor-pointer">
                            <summary className="font-medium text-blue-600">
                              {row.history.length}건 보기 ▼
                            </summary>
                            <ul className="list-disc pl-4 mt-2 text-xs text-gray-700">
                              {row.history.map((item, idx) => (
                                <li
                                  key={idx}
                                  dangerouslySetInnerHTML={{ __html: item }}
                                />
                              ))}
                            </ul>
                          </details>
                        ) : (
                          '-'
                        )
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-4 text-center text-sm text-gray-500"
                >
                  데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
