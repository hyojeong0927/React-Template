import BarChart from '../../components/chart/BarChart';
import GroupBarChart from '../../components/chart/GroupBarChart';
import DonutChart from '../../components/chart/DonutChart';

export default function ChartExample() {
  const sampleData = [
    { name: '1월', value: 400 },
    { name: '2월', value: 300 },
    { name: '3월', value: 500 },
    { name: '4월', value: 200 },
    { name: '5월', value: 350 },
  ];
  const chartData = [
    { name: '1월', 2024: 400, 2025: 460 },
    { name: '2월', 2024: 300, 2025: 350 },
    { name: '3월', 2024: 500, 2025: 480 },
    { name: '4월', 2024: 200, 2025: 320 },
    { name: '5월', 2024: 350, 2025: 410 },
  ];

  const bars = [
    { dataKey: '2024', name: '2024년', color: '#60A5FA' }, // blue-400
    { dataKey: '2025', name: '2025년', color: '#34D399' }, // green-400
  ];
  const data = [
    { name: 'Chrome', value: 55 },
    { name: 'Safari', value: 20 },
    { name: 'Edge', value: 15 },
    { name: 'Firefox', value: 7 },
    { name: '기타', value: 3 },
  ];
  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <BarChart
          title="월별 매출 현황"
          data={sampleData}
          dataKey="value"
          nameKey="name"
          color="#10B981" // Tailwind emerald-500
        />
        <GroupBarChart
          title="월별 매출 비교 (2024 vs 2025)"
          data={chartData}
          bars={bars}
        />
        <DonutChart title="브라우저 점유율" data={data} />
      </div>
    </>
  );
}
