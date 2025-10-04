import { useState } from 'react';

export default function Tabs({ tabs = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="tabs">
      {/* 탭 버튼 */}
      <div className="flex border-b border-gray-300 bg-white">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 transition-colors duration-200 ${
              activeIndex === index
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="tabs-content p-4 bg-gray-50">
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
}
