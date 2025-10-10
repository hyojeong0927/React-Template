import { useState } from 'react';
import Form from '../../components/form/Form';
import {
  Input,
  PhoneInput,
  Datepicker,
  DateRangePicker,
} from '../../components/input';

export default function FormContent() {
  const [values, setValues] = useState({ userName: '', userEmail: '' });
  const [errors, setErrors] = useState({});
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [range, setRange] = useState({ startDate: '', endDate: '' });

  // ✅ 유효성 검사
  const validate = values => {
    const newErrors = {};
    if (!values.userName.trim()) newErrors.userName = '이름을 입력해주세요.';
    if (!values.userEmail.trim()) {
      newErrors.userEmail = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.userEmail)) {
      newErrors.userEmail = '올바른 이메일 형식을 입력해주세요.';
    }
    return newErrors;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = validate(values);
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    alert('폼 제출 성공!');
  };

  const handleCancel = () => {
    setValues({ userName: '', userEmail: '' });
    setPhone('');
    setDate('');
    setRange({ startDate: '', endDate: '' });
    setErrors({});
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-8">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        회원 정보 입력
      </h1>

      <Form
        onSubmit={handleSubmit}
        bottomBtn
        button={
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-md bg-gray-400 hover:bg-gray-500 text-white font-medium transition"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
            >
              저장
            </button>
          </div>
        }
      >
        {/* 이름 */}
        <Input
          name="userName"
          label="이름"
          value={values.userName}
          onChange={handleChange}
          placeholder="이름을 입력하세요"
          required
          error={errors.userName}
        />

        {/* 이메일 */}
        <Input
          label="이메일"
          name="userEmail"
          value={values.userEmail}
          onChange={handleChange}
          placeholder="이메일 입력"
          required
          buttonLabel="인증번호 전송"
          onButtonClick={() => alert('인증번호를 전송했습니다.')}
          error={errors.userEmail}
        />

        {/* 전화번호 */}
        <PhoneInput
          label="전화번호"
          value={phone}
          onChange={setPhone}
          required
          error={
            phone && phone.length < 12 ? '전화번호를 정확히 입력해주세요.' : ''
          }
        />

        {/* 단일 날짜 */}
        <Datepicker
          label="생년월일"
          id="date"
          value={date}
          onChange={setDate}
          required
        />

        {/* 기간 선택 */}
        <DateRangePicker
          label="프로젝트 기간"
          startDate={range.startDate}
          endDate={range.endDate}
          onChange={setRange}
          required
        />
      </Form>
    </div>
  );
}
