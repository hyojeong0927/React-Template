import { useState } from 'react';
import Selectbox from '../../components/Select/Selectbox';
import SelectboxCheckbox from '../../components/Select/SelectboxCheckbox';
import SelectboxSearch from '../../components/Select/SelectboxSearch';

export default function SelectBox() {
  const [singleSelected, setSingleSelected] = useState(null);
  const [multiSelected, setMultiSelected] = useState([]);
  const [searchSelected, setSearchSelected] = useState(null);

  const sampleOptions = [
    { id: 'apple', label: 'Apple' },
    { id: 'banana', label: 'Banana' },
    { id: 'cherry', label: 'Cherry' },
    { id: 'durian', label: 'Durian' },
    { id: 'elderberry', label: 'Elderberry' },
    { id: 'fig', label: 'Fig' },
    { id: 'grape', label: 'Grape' },
  ];

  const singleOptions = sampleOptions.map(opt => ({
    value: opt.id,
    label: opt.label,
  }));

  return (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="font-semibold mb-2 text-gray-700">
          단일 선택 Selectbox
        </h3>
        <Selectbox
          id="fruit"
          name="fruit"
          options={singleOptions}
          selected={singleSelected}
          onChange={setSingleSelected}
          placeholder="과일을 선택하세요"
        />
        <p>선택된 과일: {singleSelected || '없음'}</p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">다중 선택 (전체 선택 포함)</h3>
        <SelectboxCheckbox
          items={sampleOptions}
          selectedIds={multiSelected}
          onChange={setMultiSelected}
          placeholder="과일을 선택하세요"
        />
        <p className="mt-2 text-sm">
          선택된 과일:{' '}
          {multiSelected.length ? multiSelected.join(', ') : '없음'}
        </p>
      </div>

      <div className="p-4">
        <h3 className="font-semibold mb-2">검색 기능 Selectbox</h3>
        <SelectboxSearch
          options={sampleOptions}
          selected={searchSelected}
          onChange={setSearchSelected}
          placeholder="과일을 선택하세요"
        />
        <p className="mt-2">선택된 과일: {searchSelected || '없음'}</p>
      </div>
    </div>
  );
}
