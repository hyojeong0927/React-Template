import { useState } from 'react';
import {
  Checkbox,
  CheckboxGroup,
  Radio,
  Switch,
} from '../../components/checkbox';

export default function CheckboxDemo() {
  const [selected, setSelected] = useState([]);
  const [selected1, setSelected1] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const [active, setActive] = useState(false);

  const sampleOptions = [
    { value: 'a', label: 'Apple', ariaLabel: '사과', disabled: false },
    { value: 'b', label: 'Banana', ariaLabel: '바나나', disabled: false },
    { value: 'c', label: 'Cherry', ariaLabel: '체리', disabled: false },
  ];

  return (
    <>
      <h1 className="text-xl font-bold mb-4 text-center">Checkbox & Radio</h1>

      {/* ✅ Checkbox Group 1 */}
      <CheckboxGroup
        options={sampleOptions}
        value={selected1}
        onChange={setSelected1}
        idPrefix="group1"
        showSelectAll
        selectAllLabel="전체선택"
        groupLabel="과일 선택 그룹"
        showSelectionCount
      />
      <p>현재 선택: {selected1.length > 0 ? selected1.join(', ') : '없음'}</p>

      <br />

      {/* ✅ Checkbox Group 2 (disabled) */}
      <CheckboxGroup
        options={sampleOptions}
        value={selected2}
        onChange={setSelected2}
        disabled
        idPrefix="group2"
        showSelectAll={false}
        groupLabel="과일 선택 그룹2"
        showSelectionCount={false}
      />
      <p>현재 선택: {selected2.length > 0 ? selected2.join(', ') : '없음'}</p>

      {/* ✅ 단일 Checkbox */}
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
      <hr className="my-10" />
      <h2 className="text-lg font-bold mb-3 text-center">
        라디오 컴포넌트 예시
      </h2>
      <Radio
        name="sampleRadio"
        value={selected}
        onChange={setSelected}
        options={[
          { label: '옵션 1', value: 'option1' },
          { label: '옵션 2', value: 'option2' },
          { label: '옵션 3', value: 'option3' },
        ]}
      />
      <p className="mt-3 text-gray-700">
        선택된 값: <span className="font-semibold">{selected}</span>
      </p>
      <hr className="my-10" />
      <h2 className="text-lg font-bold mb-3 text-center">Switch</h2>

      <Switch checked={active} onChange={setActive} />
      <p>현재 상태: {active ? 'ON' : 'OFF'}</p>
      <Switch checked disabled />
    </>
  );
}
