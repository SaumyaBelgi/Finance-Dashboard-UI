import { TrendingUp, AlertCircle, Calendar } from "lucide-react";

const InsightsSection = ({ transactions }) => {
  const getHighestSpendingCategory = () => {
    const map = {};

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });

    const entries = Object.entries(map);
    if (entries.length === 0) return null;

    const highest = entries.reduce((max, curr) =>
      curr[1] > max[1] ? curr : max
    );

    return { category: highest[0], amount: highest[1] };
  };

  const getMonthlyComparison = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const current = transactions
      .filter((t) => {
        const d = new Date(t.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const last = transactions
      .filter((t) => {
        const d = new Date(t.date);
        return d.getMonth() === lastMonth && d.getFullYear() === lastYear;
      })
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const diff = current - last;
    const percent = last === 0 ? 0 : (diff / last) * 100;

    return { current, last, diff, percent };
  };

  const getAvgDailySpending = () => {
    const expenses = transactions.filter((t) => t.type === "expense");
    if (expenses.length === 0) return 0;

    const total = expenses.reduce((sum, t) => sum + t.amount, 0);

    const dates = expenses
      .map((t) => new Date(t.date))
      .sort((a, b) => a - b);

    const days = Math.max(
      1,
      Math.ceil((dates[dates.length - 1] - dates[0]) / (1000 * 60 * 60 * 24))
    );

    return total / days;
  };

  const highest = getHighestSpendingCategory();
  const monthly = getMonthlyComparison();
  const avg = getAvgDailySpending();

  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg text-gray-900 dark:text-white font-medium mb-4">
          Insights
        </h3>
        <p className="text-gray-400 dark:text-gray-500 text-center py-6">
          No data available, start by adding your first transaction!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-200">

      <h3 className="text-lg text-gray-900 dark:text-white font-medium mb-6">
        Financial Insights
      </h3>

      <div className="space-y-6">

        {/* Highest Spending */}
        {highest && (
          <div className="flex gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition hover:shadow-md hover:-translate-y-1 cursor-pointer">
            <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                Highest Spending Category
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                You spent most on{" "}
                <span className="font-semibold">
                  {highest.category}
                </span>{" "}
                (${highest.amount.toFixed(2)})
              </p>
            </div>
          </div>
        )}

        {/* Monthly Comparison */}
        <div className="flex gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition hover:shadow-md hover:-translate-y-1 cursor-pointer">
          <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
            <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              Monthly Comparison
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              This month: ${monthly.current.toFixed(2)} <br />
              Last month: ${monthly.last.toFixed(2)} <br />

              {monthly.diff !== 0 && (
                <span
                  className={
                    monthly.diff > 0
                      ? "text-red-500 dark:text-red-400"
                      : "text-green-500 dark:text-green-400"
                  }
                >
                  {monthly.diff > 0 ? "↑" : "↓"}{" "}
                  {Math.abs(monthly.percent).toFixed(1)}%
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Avg Daily */}
        <div className="flex gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg transition hover:shadow-md hover:-translate-y-1 cursor-pointer">
          <div className="p-2 bg-amber-100 dark:bg-amber-800 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              Average Daily Spending
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              ${avg.toFixed(2)} per day
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InsightsSection;
