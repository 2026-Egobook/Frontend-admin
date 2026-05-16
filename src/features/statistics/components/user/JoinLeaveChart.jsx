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
import ChartTooltip from '../common/ChartTooltip';

export default function JoinLeaveChart({ data = [] }) {
  return (
    <div className="w-full min-w-0">
      <ResponsiveContainer width="100%" height={288}>
        <BarChart data={data} margin={{ top: 10, right: 24, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<ChartTooltip />} />
          <Legend />

          <Bar dataKey="joined" name="신규 가입" fill="#000000" />
          <Bar dataKey="left" name="탈퇴" fill="#737373" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}