import { useState, useEffect } from "react";
import Header from "./components/Header";
import SummarySection from "./components/SummarySection";
import ChartsSection from "./components/ChartsSection";
import InsightsSection from "./components/InsightsSection";
import TransactionsList from "./components/TransactionsList";
import { mockTransactions } from "./data/mockTransactions";
import MonthlyExpensesChart from "./components/MonthlyExpensesChart";



function App() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [role, setRole] = useState("viewer");

  const addTransaction = (t) => {
    setTransactions((prev) => [...prev, t]);
  };

  const editTransaction = (updated) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((t) => t.id !== id)
    );
  };

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);



  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-6">

          <Header role={role} setRole={setRole} darkMode={darkMode} setDarkMode={setDarkMode} />

            <SummarySection transactions={transactions} />

          <ChartsSection transactions={transactions} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MonthlyExpensesChart transactions={transactions} />
            <InsightsSection transactions={transactions} />
          </div>


          <TransactionsList
            transactions={transactions}
            userRole={role}
            onAddTransaction={addTransaction}
            onEditTransaction={editTransaction}
            onDeleteTransaction={deleteTransaction}
          />

        </div>
      </div>
    </div>
  );
}

export default App;
