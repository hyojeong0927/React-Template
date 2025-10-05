import Tabs from '../../components/tabs/Tabs';

export default function TabsExample() {
  const tabs = [
    {
      label: '공지사항',
      content: <p>📢 새로운 시스템 점검이 예정되어 있습니다.</p>,
    },
    {
      label: '이벤트',
      content: <p>🎉 현재 진행 중인 이벤트는 없습니다.</p>,
    },
    {
      label: '고객센터',
      content: <p>☎ 문의: 1234-5678 (평일 09:00~18:00)</p>,
    },
  ];

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4 text-center">탭 예시</h1>
      <Tabs tabs={tabs} />
    </div>
  );
}
