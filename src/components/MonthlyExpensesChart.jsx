import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const MonthlyExpensesChart = ({ transactions }) => {
  const generateData = () => {
    const monthlyData = {};

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        const date = new Date(t.date);
        const key = `${date.getFullYear()}-${date.getMonth()}`;

        if (!monthlyData[key]) {
          monthlyData[key] = {
            month: date.toLocaleDateString("en-US", {
              month: "short",
            }),
            amount: 0,
          };
        }

        monthlyData[key].amount += t.amount;
      });

    return Object.values(monthlyData);
  };

  const data = generateData();

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg text-gray-900 dark:text-white font-medium mb-4">
          Monthly Expenses
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500">
          No expense data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] 
                dark:hover:bg-gray-800 hover:-translate-y-0.5">

      <h3 className="text-lg text-gray-900 dark:text-white font-medium mb-4">
        Monthly Expenses
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            className="dark:stroke-gray-700"
          />

          <XAxis
            dataKey="month"
            stroke="#9ca3af"
            className="dark:stroke-gray-400"
          />

          <YAxis
            stroke="#9ca3af"
            className="dark:stroke-gray-400"
            tickFormatter={(val) => `$${val}`}
          />

          <Tooltip
            formatter={(val) => `$${val.toLocaleString()}`}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          />

          <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.amount > 1000
                    ? "rgba(239, 68, 68, 0.7)" // red
                    : "rgba(16, 185, 129, 0.7)" // green
                }
              />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpensesChart;
