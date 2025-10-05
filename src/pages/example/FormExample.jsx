import { useState } from 'react';
import Form from '../../components/form/Form';

export default function FormContent() {
  const [values, setValues] = useState({
    userName: '',
    userEmail: '',
  });

  const [errors, setErrors] = useState({});

  const validate = values => {
    const newErrors = {};
    if (!values.userName.trim()) {
      newErrors.userName = '이름을 입력해주세요.';
    }
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

    if (Object.keys(newErrors).length > 0) {
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

  const ErrorMessage = ({ message }) =>
    message ? <p className="text-red-500 text-sm mt-1">{message}</p> : null;

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
        {/* 이름 입력 */}
        <div className="form-row mb-4">
          <label htmlFor="userName" className="block mb-1 font-medium">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            id="userName"
            name="userName"
            type="text"
            placeholder="이름 입력"
            value={values.userName}
            onChange={handleChange}
            aria-invalid={errors.userName ? 'true' : 'false'}
            aria-describedby="userName-error"
            className={`border rounded-md p-2 w-full ${
              errors.userName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <ErrorMessage message={errors.userName} />
        </div>

        {/* 이메일 입력 */}
        <div className="form-row mb-4">
          <label htmlFor="userEmail" className="block mb-1 font-medium">
            이메일 <span className="text-red-500">*</span>
          </label>
          <input
            id="userEmail"
            name="userEmail"
            type="email"
            placeholder="이메일 입력"
            value={values.userEmail}
            onChange={handleChange}
            aria-invalid={errors.userEmail ? 'true' : 'false'}
            aria-describedby="userEmail-error"
            className={`border rounded-md p-2 w-full ${
              errors.userEmail ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <ErrorMessage message={errors.userEmail} />
        </div>
      </Form>
    </div>
  );
}
