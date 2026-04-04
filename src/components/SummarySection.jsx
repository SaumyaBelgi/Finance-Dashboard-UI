import SummaryCard from "./SummaryCard";

const SummarySection = () => {
  return (
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <SummaryCard
        title="Total Balance"
        amount={15040}
        type="balance"
      />

      <SummaryCard
        title="Total Income"
        amount={18100}
        type="income"
        trend={{ value: 100, isPositive: false }}
      />

      <SummaryCard
        title="Total Expenses"
        amount={3060}
        type="expense"
        trend={{ value: 100, isPositive: true }}
      />
    </div>
  );
};

export default SummarySection;
