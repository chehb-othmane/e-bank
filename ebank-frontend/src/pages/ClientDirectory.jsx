import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Total Clients",
      value: "1,240",
      change: "+5%",
      trend: "up",
      icon: "group",
      color: "primary",
    },
    {
      label: "Active Accounts",
      value: "980",
      change: "+2%",
      trend: "up",
      icon: "account_balance_wallet",
      color: "purple",
    },
    {
      label: "Pending Requests",
      value: "5",
      change: "Action Required",
      trend: "warning",
      icon: "pending_actions",
      color: "orange",
    },
  ];

  const quickActions = [
    {
      label: "Add Client",
      icon: "person_add",
      color: "primary",
      action: () => navigate("/clients/create"),
    },
    {
      label: "Transfer",
      icon: "payments",
      color: "green",
      action: () => navigate("/transfer"),
    },
    {
      label: "Create Account",
      icon: "account_balance",
      color: "blue",
      action: () => navigate("/accounts/create"),
    },
    {
      label: "View Clients",
      icon: "group",
      color: "purple",
      action: () => navigate("/clients"),
    },
  ];

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        {/* Headline */}
        <div>
          <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight">
            Welcome back, {localStorage.getItem("username") || "Agent"}
          </h1>
          <p className="text-[#9dabb9] text-base mt-2">
            Here's what's happening with your clients today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col justify-between gap-4 rounded-xl p-6 border border-border-dark bg-[#111418] hover:border-primary/50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <p className="text-[#9dabb9] text-sm font-medium">{stat.label}</p>
                  <p className="text-white text-3xl font-bold font-display">{stat.value}</p>
                </div>
                <div
                  className={`p-2 bg-${stat.color}-500/10 rounded-lg text-${stat.color}-500`}
                >
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`${
                    stat.trend === "warning"
                      ? "bg-orange-500/20 text-orange-500"
                      : "bg-[#0bda5b]/20 text-[#0bda5b]"
                  } text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1`}
                >
                  {stat.trend !== "warning" && (
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  )}
                  {stat.change}
                </span>
                {stat.trend !== "warning" && (
                  <span className="text-[#9dabb9] text-xs">vs last month</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions Grid */}
        <div>
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-border-dark bg-surface-dark hover:bg-[#283039] hover:border-primary transition-all group cursor-pointer"
              >
                <div
                  className={`size-12 rounded-full bg-${action.color}-500/10 flex items-center justify-center text-${action.color}-500 group-hover:bg-${action.color}-500 group-hover:text-white transition-colors`}
                >
                  <span className="material-symbols-outlined">{action.icon}</span>
                </div>
                <span className="text-white font-medium text-sm">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl p-8 text-center">
          <h3 className="text-white text-xl font-bold mb-2">
            Ready to serve your clients
          </h3>
          <p className="text-slate-400 text-sm">
            Use the quick actions above to get started with your daily tasks.
          </p>
        </div>
      </div>
    </Layout>
  );
}