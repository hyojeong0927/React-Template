import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function BarChart({
  data = [],
  dataKey = 'value',
  nameKey = 'name',
  title,
  color = '#4F46E5', // 기본 색상: indigo-600
  height = 300,
}) {
  return (
    <div className="bar-chart-wrap p-4 bg-white rounded-2xl shadow-sm">
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}

      <ResponsiveContainer width="100%" height={height}>
        <ReBarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={nameKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}
