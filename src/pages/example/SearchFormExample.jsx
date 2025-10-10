import { useState } from 'react';
import SearchForm from '../../components/searchbox/Search';
import { Input } from '../../components/input';

export default function Search() {
  const [values, setValues] = useState({ userName: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = e => {
    e.preventDefault();
    console.log('검색어:', values.userName);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">검색 폼 예시</h2>
      <SearchForm searchTitle="검색 폼" searchBtn onSearch={handleSearch}>
        <div className="flex flex-col gap-2">
          <Input
            name="userName"
            label="이름"
            value={values.userName}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
            required
          />
        </div>
      </SearchForm>
      <hr className="my-10" />
      <SearchForm searchBtn onSearch={handleSearch} accodian={false}>
        <div className="flex flex-col gap-2">
          <Input
            name="userName"
            label="이름"
            value={values.userName}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
            required
          />
        </div>
      </SearchForm>
    </div>
  );
}
