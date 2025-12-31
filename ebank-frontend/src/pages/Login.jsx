import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark bg-background-dark min-h-screen flex items-center justify-center font-display relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] bg-primary/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="w-full max-w-[460px] px-4 z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 backdrop-blur-sm shadow-lg shadow-primary/10">
            <span className="material-symbols-outlined text-primary text-3xl">
              account_balance_wallet
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-4 mb-2">E-Bank Agent</h1>
          <p className="text-slate-400">Secure Portal Access</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-surface-dark p-8 rounded-xl shadow-2xl border border-border-dark space-y-6 relative overflow-hidden"
        >
          {/* Decorative top line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70"></div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Username */}
          <div className="relative group">
            <input
              className="block px-4 pb-2.5 pt-5 w-full text-base text-white bg-surface-dark rounded-lg border border-border-dark appearance-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary peer transition-all"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
            <label className="absolute text-sm text-slate-400 duration-200 transform -translate-y-3 scale-90 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-primary pointer-events-none">
              Username / Agent ID
            </label>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none opacity-50">
              person
            </span>
          </div>

          {/* Password */}
          <div className="relative group">
            <input
              type={showPwd ? "text" : "password"}
              className="block px-4 pb-2.5 pt-5 w-full pr-12 text-base text-white bg-surface-dark rounded-lg border border-border-dark appearance-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary peer transition-all"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <label className="absolute text-sm text-slate-400 duration-200 transform -translate-y-3 scale-90 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-primary pointer-events-none">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-xl">
                {showPwd ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary hover:bg-blue-600 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
          >
            {loading ? (
              <>
                <span className="animate-spin material-symbols-outlined">progress_activity</span>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span>Login to Portal</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="flex justify-center gap-6 text-sm text-slate-500 mt-8">
          <a className="hover:text-white transition-colors" href="#">
            Support
          </a>
          <span className="text-slate-700">•</span>
          <a className="hover:text-white transition-colors" href="#">
            Privacy
          </a>
          <span className="text-slate-700">•</span>
          <a className="hover:text-white transition-colors" href="#">
            Terms
          </a>
        </div>
      </div>
    </div>
  );
}