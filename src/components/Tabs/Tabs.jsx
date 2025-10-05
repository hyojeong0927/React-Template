import { useState, useRef } from 'react';

export default function Tabs({ tabs = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);

  const handleKeyDown = e => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % tabs.length);
      tabRefs.current[(activeIndex + 1) % tabs.length]?.focus();
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + tabs.length) % tabs.length);
      tabRefs.current[(activeIndex - 1 + tabs.length) % tabs.length]?.focus();
    }
  };

  return (
    <div className="tabs">
      {/* 탭 버튼 영역 */}
      <div
        className="flex border-b border-gray-300 bg-white"
        role="tablist"
        aria-label="콘텐츠 탭 목록"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={el => (tabRefs.current[index] = el)}
            id={`tab-${index}`}
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`panel-${index}`}
            tabIndex={activeIndex === index ? 0 : -1}
            onKeyDown={handleKeyDown}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeIndex === index
                ? 'border-b-2 border-blue-500 text-blue-600 font-semibold'
                : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 영역 */}
      {tabs.map((tab, index) => (
        <div
          key={index}
          id={`panel-${index}`}
          role="tabpanel"
          aria-labelledby={`tab-${index}`}
          hidden={activeIndex !== index}
          className="tabs-content p-4 bg-gray-50"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
