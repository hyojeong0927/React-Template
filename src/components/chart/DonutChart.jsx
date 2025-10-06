import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function DonutChart({
  title,
  data = [],
  dataKey = 'value',
  nameKey = 'name',
  colors = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'],
  innerRadius = '60%',
  outerRadius = '80%',
  height = 300,
}) {
  return (
    <div
      className="donut-chart bg-white rounded-2xl p-4 shadow-sm"
      role="img"
      aria-label={`${title || '도넛 차트'} (${data.length}개의 항목)`}
    >
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}

      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={3}
            stroke="#fff"
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={colors[idx % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
