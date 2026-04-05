import { Wallet } from "lucide-react";
import { User } from "lucide-react";
import { Shield } from "lucide-react";
import { Moon, Sun } from "lucide-react";

const Header = ({ role, setRole, darkMode, setDarkMode }) => {
  return (
    <div className="mb-6">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-3 rounded-lg">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-3xl dark:text-white bg-black font-bold bg-clip-text text-transparent">
                Finance Dashboard
            </h1>
            <p className="text-gray-500 text-sm">
              Track and manage your financial activity
            </p>
          </div>
        </div>

        {/* Dark mode icon placeholder */}
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition"
        >
            {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
                <Moon className="w-5 h-5 text-gray-700" />
            )}
        </button>
        </div>

      {/* Role Switch */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-gray-600 dark:text-gray-300">
            <User className="w-4 h-4 inline mr-1" />
            Current Role:</span>

          <button
            onClick={() => setRole("viewer")}
            className={`px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer

            ${
              role === "viewer"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-300"
            }`}
          >
            <User className="w-4 h-4 mr-1 inline" />
            Viewer
          </button>

          <button
            onClick={() => setRole("admin")}
            className={`px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer
            ${
              role === "admin"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-300"
            }`}
          >
            <Shield className="w-4 h-4 mr-1 inline" />
            Admin
          </button>
        </div>

        <span className="text-sm text-gray-400">
          {role === "viewer" ? "Read-only access" : "Full edit access"}
        </span>
      </div>
    </div>
  );
};

export default Header;
