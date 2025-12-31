import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: "/dashboard", icon: "dashboard", label: "Dashboard" },
    { path: "/clients", icon: "group", label: "Client Directory" },
    { path: "/transfer", icon: "swap_horiz", label: "Transactions" },
  ];

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col bg-[#111418] border-r border-border-dark flex-shrink-0 transition-all duration-300">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex flex-col gap-4">
            {/* Brand */}
            <div className="flex items-center gap-3 px-2">
              <div className="bg-primary/20 rounded-xl size-10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">account_balance_wallet</span>
              </div>
              <h1 className="text-white text-lg font-bold leading-normal">E-Bank Agent</h1>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2 mt-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-primary text-white"
                      : "hover:bg-surface-dark text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <p className="text-sm font-medium leading-normal">{item.label}</p>
                </Link>
              ))}
            </nav>
          </div>

          {/* Footer/User Actions */}
          <div className="flex flex-col gap-4">
            <button
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-surface-dark hover:bg-[#3b4754] text-white text-sm font-bold leading-normal tracking-[0.015em] border border-border-dark transition-colors"
            >
              <span className="truncate">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-col flex-1 h-full overflow-hidden bg-background-dark">
        {/* Top Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-dark px-8 py-4 bg-[#111418]">
          <div className="flex items-center gap-4 text-white">
            <h2 className="text-white text-xl font-bold leading-tight">E-Bank Agent Portal</h2>
          </div>
          <div className="flex flex-1 justify-end gap-6 items-center">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="flex items-center justify-center rounded-full size-10 bg-surface-dark hover:bg-[#3b4754] text-white transition-colors relative"
              >
                <span className="material-symbols-outlined">notifications</span>
              </button>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-2 border-l border-border-dark">
              <div className="text-right hidden sm:block">
                <p className="text-white text-sm font-bold">
                  {localStorage.getItem("username") || "Agent"}
                </p>
                <p className="text-[#9dabb9] text-xs">
                  {localStorage.getItem("role") || "AGENT"}
                </p>
              </div>
              <div className="bg-primary/20 rounded-full size-10 flex items-center justify-center text-primary border-2 border-primary">
                <span className="material-symbols-outlined">person</span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}