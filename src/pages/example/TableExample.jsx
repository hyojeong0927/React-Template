import Table from '../../components/table/Table';

export default function ExamplePage() {
  const columns = [
    { key: 'id', label: 'ID', sort: true, rowspan: 2 },
    { key: 'name', label: '이름', sort: true, rowspan: 2 },
    {
      group: '조직 정보',
      children: [
        { key: 'dept', label: '부서' },
        { key: 'team', label: '팀' },
      ],
    },
    { key: 'age', label: '나이', sort: false, rowspan: 2 },
  ];

  const data = [
    { id: 1, name: '김효정', dept: '디자인', team: 'UI', age: 30 },
    { id: 2, name: '이은지', dept: '디자인', team: 'UX', age: 27 },
    { id: 3, name: '박서연', dept: '개발', team: 'Frontend', age: 34 },
    { id: 4, name: '최민지', dept: '개발', team: 'Backend', age: 31 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Header Rowspan + Group Header Table
      </h1>
      <Table
        columns={columns}
        data={data}
        rowspanKeys={['dept']}
        colspanGroups={[['dept', 'team']]}
      />
    </div>
  );
}
