import { useState } from "react";
import { login } from "../services/authService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="dark bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center font-display">
      <div className="w-full max-w-[460px] px-4">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto bg-primary/20 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-3xl">
              account_balance_wallet
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-3">
            E-Bank Agent
          </h1>
          <p className="text-slate-500 dark:text-text-muted">
            Secure Portal Access
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-surface-dark p-8 rounded-xl shadow-2xl border dark:border-border-dark space-y-6"
        >

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Username */}
          <div className="relative">
            <input
              className="peer w-full px-4 pt-5 pb-2.5 rounded-lg bg-slate-50 dark:bg-surface-dark border dark:border-border-dark text-slate-900 dark:text-white focus:ring-primary focus:border-primary"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="absolute left-4 top-3.5 text-sm text-slate-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-3.5 peer-focus:text-sm transition-all">
              Username / Agent ID
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              className="peer w-full px-4 pt-5 pb-2.5 pr-12 rounded-lg bg-slate-50 dark:bg-surface-dark border dark:border-border-dark text-slate-900 dark:text-white focus:ring-primary focus:border-primary"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="absolute left-4 top-3.5 text-sm text-slate-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-3.5 peer-focus:text-sm transition-all">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <span className="material-symbols-outlined">
                {showPwd ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg flex items-center justify-center gap-2"
          >
            Login to Portal
            <span className="material-symbols-outlined">
              arrow_forward
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
