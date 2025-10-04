import { useRef, useState, useEffect } from 'react';
import styles from './Stickypage.module.css';

export default function StickyPage() {
  const sectionRefs = useRef([]);
  const contentRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const isClickScrolling = useRef(false);

  const tabItems = [
    { label: '상세정보', content: '상품 상세 정보 내용' },
    { label: '리뷰', content: '리뷰 내용' },
    { label: 'Q&A', content: 'Q&A 내용' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const scrollPos = contentRef.current.scrollTop + 60;

      sectionRefs.current.forEach((section, index) => {
        if (
          section.offsetTop <= scrollPos &&
          section.offsetTop + section.offsetHeight > scrollPos
        ) {
          setActiveTab(index);
        }
      });
    };

    const contentEl = contentRef.current;
    contentEl.addEventListener('scroll', handleScroll, { passive: true });

    return () => contentEl.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = index => {
    const headerHeight = 56;
    const sectionTop = sectionRefs.current[index].offsetTop - headerHeight;

    isClickScrolling.current = true;

    contentRef.current.scrollTo({
      top: sectionTop,
      behavior: 'smooth',
    });

    setActiveTab(index);

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 500);
  };

  return (
    <div
      className="page"
      style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      {/* 헤더 */}
      <div className={styles.header}>
        <div className="p-4 text-lg font-bold">상품 상세 페이지</div>
      </div>

      {/* 컨텐츠 */}
      <div
        className="content"
        ref={contentRef}
        style={{ flex: 1, overflowY: 'auto' }}
      >
        {/* 상품 정보 */}
        <div className="product-info p-4 bg-white shadow mb-4">
          <div className="product-title text-xl font-bold mb-2">상품명</div>
          <div className="product-image h-64 bg-gray-200 flex items-center justify-center">
            이미지 영역
          </div>
          <div className="product-price mt-4 text-lg font-semibold">
            가격: 99,000원
          </div>
        </div>

        {/* 탭 */}
        <div className={styles['tabs-container']}>
          <div className={styles.tabs}>
            {tabItems.map((tab, index) => (
              <button
                key={index}
                className={activeTab === index ? 'active' : ''}
                onClick={() => scrollToSection(index)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 탭 콘텐츠 */}
        {tabItems.map((tab, index) => (
          <div
            key={index}
            ref={el => (sectionRefs.current[index] = el)}
            className={styles['tab-body']}
            style={{
              minHeight: '600px',
              background: '#f9f9f9',
              marginBottom: '20px',
            }}
          >
            <h2 className="text-xl font-bold mb-4">{tab.label}</h2>
            <p>{tab.content}</p>
            <div style={{ height: '500px' }}>스크롤 테스트 콘텐츠</div>
          </div>
        ))}
      </div>
    </div>
  );
}
