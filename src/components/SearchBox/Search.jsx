import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function SearchForm({
  searchTitle,
  accodian = true,
  searchBtn = true,
  children,
  onSearch,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const contentId = `${searchTitle?.replace(/\s+/g, '-') || 'search'}-content`;

  const handleSubmit = e => {
    e.preventDefault();
    if (onSearch) onSearch(e);
  };

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <form
      onSubmit={handleSubmit}
      className="search-form border rounded-lg p-4 bg-white shadow"
      role="search"
      aria-label={searchTitle || '검색 폼'}
    >
      <fieldset>
        <div className="search-header flex justify-between items-center mb-3">
          {searchTitle && (
            <legend className="text-lg font-bold mb-2">{searchTitle}</legend>
          )}

          {accodian && (
            <button
              type="button"
              onClick={toggleAccordion}
              aria-expanded={isOpen}
              aria-controls={contentId}
              aria-label={isOpen ? '검색 영역 접기' : '검색 영역 펼치기'}
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              {isOpen ? '접기' : '펼치기'}
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          )}
        </div>

        {/* 아코디언 영역 */}
        <div id={contentId} hidden={!isOpen} className="search-content mb-3">
          {children}
        </div>

        {searchBtn && (
          <div className="search-btn text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              검색
            </button>
          </div>
        )}
      </fieldset>
    </form>
  );
}
