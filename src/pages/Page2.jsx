import { useNavigate } from 'react-router-dom';

export default function Page2() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="p-8">
        <h1 className="text-3xl font-bold">페이지 2</h1>
        <p>페이지 2 내용입니다.</p>
      </div>

      <div className="flex justify-between p-4 bg-gray-100">
        <button
          onClick={() => navigate('/etc/page1')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          이전 페이지
        </button>
        <button
          onClick={() => navigate('/etc/page3')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          다음 페이지
        </button>
      </div>
    </div>
  );
}
