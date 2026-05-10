import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartTooltip from '../common/ChartTooltip';

export default function DiaryTypeChart({ data = [] }) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip content={<ChartTooltip labelMap={{ count: '작성 수' }} />} />
          <Bar dataKey="count" fill="#000000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}