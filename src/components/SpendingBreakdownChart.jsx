import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
];

const SpendingBreakdownChart = ({ transactions }) => {
  const generateData = () => {
    const map = {};

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });

    return Object.entries(map).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const data = generateData();

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg text-gray-900 dark:text-white font-medium mb-4">
          Spending Breakdown
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500">
          No expense data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.25)] dark:hover:bg-gray-800 hover:-translate-y-1">
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Spending Breakdown
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
            formatter={(val) => `$${val.toLocaleString()}`}
          />

          <Legend wrapperStyle={{ color: "#9ca3af" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingBreakdownChart;
