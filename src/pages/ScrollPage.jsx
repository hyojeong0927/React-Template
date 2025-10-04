import { useState, useEffect } from 'react';

export default function ScrollButtonPage() {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 5) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    alert('버튼 클릭됨!');
  };

  return (
    <div className="min-h-screen relative">
      <div className="p-8 space-y-8">
        <h1 className="text-3xl font-bold">스크롤 버튼 예시 페이지</h1>
        {[...Array(30)].map((_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 스크롤을
            내려 페이지 끝까지 이동하세요.
          </p>
        ))}
      </div>

      {/* 버튼 */}
      {isBottom && (
        <button
          onClick={handleClick}
          className="fixed bottom-8 right-8 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
        >
          끝까지 스크롤 완료!
        </button>
      )}
    </div>
  );
}
