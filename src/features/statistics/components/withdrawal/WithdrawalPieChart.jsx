import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const COLORS = ['#171717', '#404040', '#737373', '#a3a3a3', '#d4d4d4'];

export default function WithdrawalPieChart({ data = [] }) {
  return (
    <div className="h-72 min-h-72 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="count" nameKey="reason" cx="50%" cy="50%" outerRadius={90}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}