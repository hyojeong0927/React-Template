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

  const handleSubmit = e => {
    e.preventDefault();
    if (onSearch) onSearch(e);
  };

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <form
      onSubmit={handleSubmit}
      className="search-form border rounded-lg p-4 bg-white shadow"
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
              aria-label={isOpen ? '접기' : '펼치기'}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
            >
              {isOpen ? '접기' : '펼치기'}
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          )}
        </div>

        {isOpen && children && (
          <div className="search-content mb-3">{children}</div>
        )}

        {searchBtn && (
          <div className="search-btn text-right">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              검색
            </button>
          </div>
        )}
      </fieldset>
    </form>
  );
}
