import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductListPage() {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState('grid');

  const [products] = useState([
    { id: 1, name: '상품 A', price: 99000 },
    { id: 2, name: '상품 B', price: 129000 },
    { id: 3, name: '상품 C', price: 59000 },
    { id: 4, name: '상품 D', price: 149000 },
    { id: 5, name: '상품 E', price: 89000 },
    { id: 6, name: '상품 F', price: 109000 },
  ]);

  const goToDetail = id => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="p-4">
      {/* 보기 모드 버튼 */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded border ${
            viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
          onClick={() => setViewMode('grid')}
        >
          그리드 보기
        </button>
        <button
          className={`px-4 py-2 rounded border ${
            viewMode === 'listImage' ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
          onClick={() => setViewMode('listImage')}
        >
          리스트 보기 (이미지 포함)
        </button>
        <button
          className={`px-4 py-2 rounded border ${
            viewMode === 'listNoImage' ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
          onClick={() => setViewMode('listNoImage')}
        >
          리스트 보기 (이미지 없음)
        </button>
      </div>

      {/* 상품 리스트 */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 gap-4">
          {products.map(product => (
            <div
              key={product.id}
              className="border rounded shadow p-4 cursor-pointer hover:shadow-lg"
              onClick={() => goToDetail(product.id)}
            >
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                이미지
              </div>
              <div className="mt-2 text-lg font-bold">{product.name}</div>
              <div className="mt-1 text-red-500 font-semibold">
                {product.price.toLocaleString()}원
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'listImage' && (
        <div className="space-y-2">
          {products.map(product => (
            <div
              key={product.id}
              className="border rounded shadow p-4 cursor-pointer hover:shadow-lg flex items-center gap-4"
              onClick={() => goToDetail(product.id)}
            >
              <div className="w-24 h-24 bg-gray-200 flex items-center justify-center">
                이미지
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold">{product.name}</div>
                <div className="text-red-500 font-semibold">
                  {product.price.toLocaleString()}원
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'listNoImage' && (
        <div className="space-y-2">
          {products.map(product => (
            <div
              key={product.id}
              className="border rounded shadow p-4 cursor-pointer hover:shadow-lg flex justify-between items-center"
              onClick={() => goToDetail(product.id)}
            >
              <div className="text-lg font-bold">{product.name}</div>
              <div className="text-red-500 font-semibold">
                {product.price.toLocaleString()}원
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
