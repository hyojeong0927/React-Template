import { useState } from 'react';
import Button from '../../components/button/Button.jsx';
import SlideButton from '../../components/button/SlideButton.jsx.jsx';
import { FaCheck, FaTrash, FaArrowRight } from 'react-icons/fa';

export default function ButtonContent() {
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleClick = () => {
    setLoadingBtn(true);
    setTimeout(() => setLoadingBtn(false), 2000);
  };
  const variants = ['primary', 'secondary', 'outline', 'danger'];
  const sizes = ['sm', 'md', 'lg'];
  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">버튼 테스트 페이지</h1>

      {variants.map(variant => (
        <div key={variant} className="space-y-4">
          <h2 className="text-xl font-semibold capitalize">{variant} 버튼</h2>
          <div className="flex flex-wrap gap-4">
            {sizes.map(size => (
              <Button
                key={size}
                variant={variant}
                size={size}
                onClick={handleClick}
                loading={loadingBtn}
                iconLeft={<FaCheck />}
                iconRight={<FaArrowRight />}
              >
                {size} 버튼
              </Button>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-8">
        <h2 className="text-xl font-semibold">전체 너비 버튼</h2>
        <Button variant="primary" size="lg" fullWidth>
          전체 너비 버튼
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">비활성 버튼</h2>
        <Button variant="danger" size="md" disabled>
          삭제 불가
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">로딩 버튼</h2>
        <Button variant="primary" size="md" loading loadingText="로딩중...">
          저장하기
        </Button>
      </div>
      {/* slide button */}
      <SlideButton />
    </div>
  );
}
