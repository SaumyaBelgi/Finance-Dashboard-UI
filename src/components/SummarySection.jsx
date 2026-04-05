import SummaryCard from "./SummaryCard";

const SummarySection = ({ transactions = [] }) => {
  // 1. Calculate Total Income
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 2. Calculate Total Expenses
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 3. Calculate Balance
  const totalBalance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <SummaryCard
        title="Total Balance"
        amount={totalBalance}
        type="balance"
      />

      <SummaryCard
        title="Total Income"
        amount={totalIncome}
        type="income"
        // You can leave trend hardcoded for now or remove it 
        // until you have logic to compare months!
      />

      <SummaryCard
        title="Total Expenses"
        amount={totalExpenses}
        type="expense"
      />
    </div>
  );
};

export default SummarySection;