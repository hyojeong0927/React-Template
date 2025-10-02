import { useState } from 'react';
import { Checkbox, CheckboxGroup } from '../../components/Checkbox';

function CheckboxDemo() {
  const [selected, setSelected] = useState([]);
  const [selected1, setSelected1] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const sampleOptions = [
    {
      value: 'a',
      label: 'Apple',
      ariaLabel: '사과',
      disabled: false,
      checked: true,
    },
    {
      value: 'b',
      label: 'Banana',
      ariaLabel: '바나나',
      disabled: false,
      checked: true,
    },
    { value: 'c', label: 'Cherry', ariaLabel: '체리', disabled: false },
  ];

  return (
    <>
      <CheckboxGroup
        options={sampleOptions}
        value={selected1}
        onChange={setSelected1}
        idPrefix="group1"
        showSelectAll={true}
        selectAllLabel="all"
        groupLabel="과일 선택 그룹"
        showSelectionCount={true}
      />
      <p>현재 선택: {selected1.length > 0 ? selected1.join(', ') : '없음'}</p>
      <br />
      <CheckboxGroup
        options={sampleOptions}
        value={selected2}
        onChange={setSelected2}
        disabled={true}
        idPrefix="group2"
        showSelectAll={false}
        groupLabel="과일 선택 그룹2"
        showSelectionCount={false}
      />
      <p>현재 선택: {selected2.length > 0 ? selected2.join(', ') : '없음'}</p>
      <Checkbox
        id="single-check"
        option={{ value: 'agree', label: '동의' }}
        value={selected}
        onChange={val =>
          setSelected(prev =>
            prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val],
          )
        }
      />
    </>
  );
}

export default CheckboxDemo;
