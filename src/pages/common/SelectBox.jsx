import { useState } from 'react';
import Selectbox from '../../components/Select/Select';

function SelectBox() {
  const [selected, setSelected] = useState(null);

  const sampleOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];
  return (
    <div>
      <Selectbox
        id="fruit"
        name="fruit"
        options={sampleOptions}
        selected={selected}
        onChange={val => setSelected(val)}
        placeholder="과일을 선택하세요"
      />
      <p>선택된 과일: {selected || '없음'}</p>
    </div>
  );
}

export default SelectBox;
