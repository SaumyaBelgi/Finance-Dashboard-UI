import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const SummaryCard = ({ title, amount, type, trend }) => {
  const getIcon = () => {
    switch (type) {
      case "balance":
        return <DollarSign className="w-6 h-6" />;
      case "income":
        return <TrendingUp className="w-6 h-6" />;
      case "expense":
        return <TrendingDown className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case "balance":
        return "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400";
      case "income":
        return "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400";
      case "expense":
        return "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 
                hover:-translate-y-0.5 
                hover:shadow-[0_20px_50px_rgba(59,130,246,0.20)] 
                dark:hover:bg-gray-800 cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses()}`}>
          {getIcon()}
        </div>

        {trend && (
          <div
            className={`flex items-center gap-1 text-sm ${
              trend.isPositive
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>

      <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">
        {title}
      </h3>

      <p className="text-3xl font-semibold text-gray-900 dark:text-white">
        $
        {amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </div>
  );
};

export default SummaryCard;
