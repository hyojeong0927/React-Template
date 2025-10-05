import { Ulist, Dlist, Olist } from '../../components/etc/List';

export default function ListExample() {
  return (
    <div className="space-y-6 p-4">
      <h2 className="text-lg font-bold">순서 없는 리스트</h2>
      <Ulist items={['사과', '바나나', '오렌지']} />

      <h2 className="text-lg font-bold">순서 있는 리스트</h2>
      <Olist items={['첫 번째', '두 번째', '세 번째']} />

      <h2 className="text-lg font-bold">정의 리스트</h2>
      <Dlist
        items={[
          { term: 'HTML', description: '웹 페이지 구조를 정의하는 언어' },
          { term: 'CSS', description: '스타일링 언어' },
          { term: 'JavaScript', description: '동적 기능 구현 언어' },
        ]}
      />
    </div>
  );
}
