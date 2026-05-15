import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartTooltip from '../common/ChartTooltip';

export default function InkChart({ data = [] }) {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={288}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            content={<ChartTooltip labelMap={{ issued: '발행량', consumed: '소비량' }} />}
          />
          <Legend />
          <Bar dataKey="issued" name="발행량" fill="#000000" />
          <Bar dataKey="consumed" name="소비량" fill="#808080" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}