import { useState } from "react";
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
import { Plus, Settings2, Search } from "lucide-react";

const MonthlyExpensesChart = ({ transactions }) => {
  const [monthlyLimit, setMonthlyLimit] = useState(1000);
  const [isSettingLimit, setIsSettingLimit] = useState(false);
  const [inputValue, setInputValue] = useState(monthlyLimit);

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

  const handleSetLimit = (e) => {
    e.preventDefault();
    setMonthlyLimit(Number(inputValue));
    setIsSettingLimit(false);
  };

  return (
    <>
      {/* MAIN CHART CARD */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-[0_20px_50px_rgba(59,130,246,0.20)] dark:hover:bg-gray-800 hover:-translate-y-0.5 relative">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg text-gray-900 dark:text-white font-medium">
            Monthly Expenses
          </h3>
          
          <button
            onClick={(e) => {
              e.stopPropagation(); // Stops the click from triggering the parent div's hover/events
              setIsSettingLimit(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-sm text-sm"
          >
            <Plus size={16} /> Set Monthly Limit
          </button>
        </div>

        {/* CHART AREA */}
        {data.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 space-y-2">
            <Search size={32} className="opacity-20" />
            <p>No expense data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                className="dark:stroke-gray-700"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                formatter={(val) => `$${val.toLocaleString()}`}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                }}
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={40}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.amount > monthlyLimit
                        ? "rgba(239, 68, 68, 0.8)" // High Expense (Red)
                        : "rgba(16, 185, 129, 0.8)" // Within Limit (Green)
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {/* STATUS FOOTER */}
        <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-700/50 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <Settings2 size={12} />
          Current Monthly Limit: <span className="font-bold text-blue-600 dark:text-blue-400">${monthlyLimit}</span>
        </div>
      </div>

      {/* LIMIT MODAL (Rendered outside the main card to prevent flickering) */}
      {isSettingLimit && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4"
          onClick={() => setIsSettingLimit(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-xs shadow-2xl border border-gray-100 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()} // Stop click from closing when clicking inside form
          >
            <div className="flex flex-col items-center mb-6 text-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3 text-blue-600">
                <Settings2 size={24} />
              </div>
              <h4 className="text-xl text-gray-900 dark:text-white font-bold">Monthly Limit</h4>
              <p className="text-sm text-gray-500">Set your expense threshold</p>
            </div>

            <form onSubmit={handleSetLimit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Amount in USD
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input 
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    autoFocus
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button 
                  type="submit" 
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all"
                >
                  Save
                </button>
                <button 
                  type="button"
                  onClick={() => setIsSettingLimit(false)}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MonthlyExpensesChart;