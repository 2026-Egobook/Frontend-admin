import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import ChartTooltip from '../common/ChartTooltip';

export default function DauMauChart({ data = [] }) {
  return (
    <div className="w-full min-w-0">
      <ResponsiveContainer width="100%" height={288}>
        <LineChart data={data} margin={{ top: 10, right: 24, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<ChartTooltip />} />
          <Legend />

          <Line type="monotone" dataKey="dau" name="DAU" stroke="#000000" />
          <Line type="monotone" dataKey="mau" name="MAU" stroke="#737373" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}