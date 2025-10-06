import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function GroupBarChart({
  title,
  data = [],
  bars = [],
  height = 320,
}) {
  return (
    <div
      className="group-bar-chart bg-white rounded-2xl p-4 shadow-sm"
      role="img"
      aria-label={`${title || '그룹형 막대그래프'} (${data.length}개의 항목)`}
    >
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}

      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* bars 배열을 기반으로 여러 막대 자동 렌더링 */}
          {bars.map((bar, idx) => (
            <Bar
              key={idx}
              dataKey={bar.dataKey}
              name={bar.name}
              fill={bar.color}
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
