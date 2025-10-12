import { useState, useMemo } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

export default function Table({
  columns,
  data,
  rowspanKeys = [],
  colspanGroups = [],
  className = '', // 전체 td 기본 class
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  /** 정렬 핸들러 */
  const handleSort = key => {
    setSortConfig(prev => {
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' };
        if (prev.direction === 'desc') return { key: null, direction: null };
      }
      return { key, direction: 'asc' };
    });
  };

  /** 정렬 적용 */
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  /** header flatten & header rows */
  const flatColumns = [];
  const headerRows = [[], []];
  columns.forEach(col => {
    if (col.group && col.children?.length) {
      headerRows[0].push({ label: col.group, colspan: col.children.length });
      col.children.forEach(child => {
        headerRows[1].push(child);
        flatColumns.push(child);
      });
    } else {
      const rowspan = col.rowspan || 2;
      headerRows[0].push({ ...col, rowspan });
      if (rowspan === 2) headerRows[1].push(null);
      flatColumns.push(col);
    }
  });

  /** rowspan/colspan 계산 */
  const mergedRows = useMemo(() => {
    const merged = sortedData.map(row => ({
      ...row,
      _rowspan: {},
      _colspan: {},
    }));

    // rowspan 계산
    rowspanKeys.forEach(key => {
      let lastValue = null;
      let startIndex = 0;
      let count = 0;
      sortedData.forEach((row, i) => {
        if (row[key] === lastValue) {
          count++;
          merged[startIndex]._rowspan[key] = count;
          merged[i]._rowspan[key] = 0;
        } else {
          lastValue = row[key];
          startIndex = i;
          count = 1;
          merged[i]._rowspan[key] = 1;
        }
      });
    });

    // colspan 계산
    colspanGroups.forEach(group => {
      merged.forEach(row => {
        let isFirst = true;
        group.forEach(key => {
          if (isFirst) {
            row._colspan[group[0]] = group.length;
            isFirst = false;
          } else {
            row._colspan[key] = 0;
          }
        });
      });
    });

    return merged;
  }, [sortedData, rowspanKeys, colspanGroups]);

  /** 정렬 아이콘 */
  const getSortIcon = key => {
    if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
    if (sortConfig.direction === 'asc')
      return <FaSortUp className="text-blue-500" />;
    if (sortConfig.direction === 'desc')
      return <FaSortDown className="text-blue-500" />;
  };

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full table-fixed text-sm text-left">
        <thead className="bg-gray-100">
          {headerRows.map((row, ri) => (
            <tr key={ri}>
              {row.map((col, ci) => {
                if (!col) return null;
                const props = {};
                if (col.rowspan) props.rowSpan = col.rowspan;
                if (col.colspan) props.colSpan = col.colspan;
                if (col.width) props.style = { width: col.width };
                return (
                  <th
                    key={ci}
                    {...props}
                    className={`px-4 py-2 font-bold border-b text-center ${
                      col.sort ? 'cursor-pointer select-none' : ''
                    } ${col.className || ''}`}
                    onClick={() => col.sort && handleSort(col.key)}
                  >
                    <div className="flex items-center gap-1 justify-center">
                      {col.label}
                      {col.sort && getSortIcon(col.key)}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {mergedRows.map((row, i) => {
            // row.className이 함수면 호출, 아니면 문자열 사용
            const rowClass =
              typeof row.className === 'function'
                ? row.className(row)
                : row.className || '';
            return (
              <tr key={i} className={`hover:bg-gray-50 ${rowClass}`}>
                {flatColumns.map(col => {
                  const rowspan = row._rowspan[col.key] ?? 1;
                  const colspan = row._colspan[col.key] ?? 1;
                  if (rowspan === 0 || colspan === 0) return null;
                  return (
                    <td
                      key={col.key}
                      rowSpan={rowspan}
                      colSpan={colspan}
                      style={col.width ? { width: col.width } : undefined}
                      className={`px-4 py-2 border-b align-top text-center ${className} ${
                        col.className || ''
                      }`}
                    >
                      {row[col.key]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
