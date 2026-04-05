import { useState } from "react";
import {
  Search,
  ArrowUpDown,
  Plus,
  Edit2,
  X,
} from "lucide-react";

const categories = [
  "Salary",
  "Freelance",
  "Investment",
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Bills",
  "Healthcare",
  "Education",
  "Other",
];

const TransactionsList = ({
  transactions,
  userRole,
  onAddTransaction,
  onEditTransaction,
  onDeleteTransaction,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const filteredTransactions = transactions
    .filter((t) => {
      const matchesSearch =
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filterType === "all" || t.type === filterType;
      const matchesCategory =
        filterCategory === "all" || t.category === filterCategory;

      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      let val =
        sortField === "date"
          ? new Date(a.date) - new Date(b.date)
          : a.amount - b.amount;

      return sortOrder === "asc" ? val : -val;
    });

  // FORM 
const TransactionForm = ({ transaction, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: transaction?.date || new Date().toISOString().split("T")[0],
    amount: transaction?.amount || "",
    category: transaction?.category || "Food",
    type: transaction?.type || "expense",
    description: transaction?.description || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transaction) {
      onSubmit({ ...transaction, ...formData });
    } else {
      onSubmit({
        ...formData,
        id: Date.now().toString(),
      });
    }
  };

  // Common label style for consistency
  const labelStyle = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {transaction ? "Edit" : "Add"} Transaction
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* 1. Type */}
          <div>
            <label className={labelStyle} required >Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* 2. Category */}
          <div>
            <label className={labelStyle}>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" required
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* 3. Amount */}
          <div>
            <label className={labelStyle} required>Amount</label>
            <input
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" required
            />
          </div>

          {/* 4. Date */}
          <div>
            <label className={labelStyle} required>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" required
            />
          </div>

          {/* 5. Description */}
          <div>
            <label className={labelStyle}>Description</label>
            <input
              type="text"
              placeholder="What was this for?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 dark:bg-gray-700 dark:text-white py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg text-gray-900 dark:text-white font-medium">
          Transactions
        </h3>

        {userRole === "admin" && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition shadow-sm"
          >
            <Plus size={16} /> Add Transaction
          </button>
        )}
      </div>

      {/* FILTERS */}
      <div className="space-y-4 mb-6">

        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="pl-9 pr-3 py-2 w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 rounded-lg text-sm"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 rounded-lg text-sm"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <button
            onClick={() => {
              setSortField("date");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1"
          >
            <ArrowUpDown size={14} /> Date
          </button>

          <button
            onClick={() => {
              setSortField("amount");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1"
          >
            <ArrowUpDown size={14} /> Amount
          </button>

        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">

          <thead>
            <tr>
              <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-normal px-4">Date</th>
              <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-normal px-4">Description</th>
              <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-normal px-4">Category</th>
              <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-normal px-4">Type</th>
              <th className="text-right text-sm text-gray-500 dark:text-gray-400 font-normal px-4">Amount</th>
              {userRole === "admin" && (
                <th className="text-right text-sm text-gray-500 dark:text-gray-400 font-normal px-4">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => (
              <tr
                key={t.id}
                className="bg-gray-50 dark:bg-gray-700/40 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                  {new Date(t.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </td>

                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  {t.description}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                  {t.category}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      t.type === "income"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>

                <td
                  className={`px-4 py-3 text-sm text-right font-medium ${
                    t.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}$
                  {t.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </td>

                {userRole === "admin" && (
                <td className="px-4 py-3">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingTransaction(t);
                        }}
                        className="text-blue-500 hover:text-blue-700 transition"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm("Are you sure you want to delete this transaction?")) {
                            onDeleteTransaction(t.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <X size={16} />
                     </button>
                    </div>
                  </td>
                )}
              </tr>
              ))
            ) : (
            /* EMPTY STATE ROW */
              <tr>
                <td 
                  colSpan={userRole === "admin" ? 6 : 5} 
                  className="px-4 py-20 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-full">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-900 dark:text-white font-medium text-lg">
                        No transaction data available.
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        Begin by adding a new transaction!
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* MODALS */}
      {showAddModal && (
        <TransactionForm
          onSubmit={(t) => {
            onAddTransaction(t);
            setShowAddModal(false);
          }}
          onCancel={() => setShowAddModal(false)}
        />
      )}

      {editingTransaction && (
        <TransactionForm
          transaction={editingTransaction}
          onSubmit={(t) => {
            onEditTransaction(t);
            setEditingTransaction(null);
          }}
          onCancel={() => setEditingTransaction(null)}
        />
      )}
    </div>
  );
};

export default TransactionsList;
