import Button from '../../components/button/Button.jsx';
import SlideButton from '../../components/button/SlideButton.jsx.jsx';
import { FaCheck, FaTrash, FaArrowRight } from 'react-icons/fa';

export default function ButtonContent() {
  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">버튼 테스트 페이지</h1>

      {/* 기본 버튼들 */}
      <div className="flex flex-col gap-4 w-[300px]">
        <Button>기본 버튼</Button>

        <Button iconLeft={<FaCheck />} variant="primary">
          확인
        </Button>

        <Button iconRight={<FaArrowRight />} variant="secondary">
          다음 단계
        </Button>

        <Button iconLeft={<FaTrash />} variant="danger">
          삭제
        </Button>
      </div>
      {/* slide button */}
      <SlideButton />
    </div>
  );
}
