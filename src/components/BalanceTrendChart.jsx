import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BalanceTrendChart = ({ transactions }) => {
  const generateChartData = () => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    let balance = 0;

    return sorted.map((t) => {
      if (t.type === "income") balance += t.amount;
      else balance -= t.amount;

      return {
        date: new Date(t.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        balance,
      };
    });
  };

  const data = generateChartData();

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg text-gray-900 dark:text-white font-medium mb-4">
          Balance Trend
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500">
          No expense data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.20)] dark:hover:bg-gray-800 hover:-translate-y-1">
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Balance Trend
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            className="dark:stroke-gray-700"
          />

          <XAxis
            dataKey="date"
            stroke="#6b7280"
            className="dark:stroke-gray-400"
          />

          <YAxis
            stroke="#6b7280"
            className="dark:stroke-gray-400"
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#ebedf0",
              border: "none",
              borderRadius: "8px",
              color: "#000",
            }}
            formatter={(val) => `$${val.toLocaleString()}`}
          />

          <Line
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
