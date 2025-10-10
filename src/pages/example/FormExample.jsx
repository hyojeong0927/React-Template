import { useState } from 'react';
import Form from '../../components/form/Form';
import { Input, PhoneInput } from '../../components/input';

export default function FormContent() {
  const [values, setValues] = useState({ userName: '', userEmail: '' });
  const [errors, setErrors] = useState({});
  const [phone, setPhone] = useState('');

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
    setErrors({});
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4 text-center">폼 예시</h1>

      <Form
        bottomBtn
        onSubmit={handleSubmit}
        button={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              저장
            </button>
          </div>
        }
      >
        <Input
          name="userName"
          label="이름"
          value={values.userName}
          onChange={handleChange}
          placeholder="이름 입력"
          required
          error={errors.userName}
        />

        <Input
          name="userEmail"
          label="이메일"
          type="email"
          value={values.userEmail}
          onChange={handleChange}
          placeholder="이메일 입력"
          required
          error={errors.userEmail}
        />
        <PhoneInput
          label="전화번호"
          value={phone}
          onChange={setPhone}
          required
          error={
            phone && phone.length < 12 ? '전화번호를 정확히 입력해주세요.' : ''
          }
        />
      </Form>
    </div>
  );
}
