import BalanceTrendChart from "./BalanceTrendChart";
import SpendingBreakdownChart from "./SpendingBreakdownChart";

const ChartsSection = ({ transactions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <BalanceTrendChart transactions={transactions} />
      <SpendingBreakdownChart transactions={transactions} />
    </div>
  );
};

export default ChartsSection;
