import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { transfer } from "../services/transactionService";

export default function Transfer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    ribFrom: "",
    ribTo: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await transfer(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Layout>
        <div className="max-w-[600px] mx-auto">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-green-500 text-4xl">
                check_circle
              </span>
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">Transfer Successful!</h2>
            <p className="text-slate-400 mb-4">
              {formData.amount} MAD has been transferred from {formData.ribFrom} to{" "}
              {formData.ribTo}
            </p>
            <p className="text-sm text-slate-500">Redirecting to dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-[800px] mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight">
              Money Transfer
            </h1>
            <p className="text-[#9dabb9] text-base mt-2">
              Transfer funds between client accounts
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 bg-surface-dark hover:bg-[#3b4754] text-white rounded-lg transition-colors border border-border-dark"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Back</span>
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-surface-dark rounded-xl border border-border-dark p-8 space-y-6"
        >
          {/* Transfer Details */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold mb-4">Transfer Details</h3>

            {/* From Account */}
            <div className="relative">
              <input
                type="text"
                name="ribFrom"
                value={formData.ribFrom}
                onChange={handleChange}
                required
                pattern="[0-9]{24}"
                maxLength="24"
                className="block px-4 pb-2.5 pt-5 w-full text-base text-white bg-[#111418] rounded-lg border border-border-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary peer font-mono"
                placeholder=" "
              />
              <label className="absolute text-sm text-slate-400 duration-200 transform -translate-y-3 scale-90 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-primary">
                From Account (RIB) *
              </label>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                account_balance
              </span>
            </div>

            {/* Transfer Icon */}
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">
                  arrow_downward
                </span>
              </div>
            </div>

            {/* To Account */}
            <div className="relative">
              <input
                type="text"
                name="ribTo"
                value={formData.ribTo}
                onChange={handleChange}
                required
                pattern="[0-9]{24}"
                maxLength="24"
                className="block px-4 pb-2.5 pt-5 w-full text-base text-white bg-[#111418] rounded-lg border border-border-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary peer font-mono"
                placeholder=" "
              />
              <label className="absolute text-sm text-slate-400 duration-200 transform -translate-y-3 scale-90 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-primary">
                To Account (RIB) *
              </label>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                account_balance
              </span>
            </div>

            {/* Amount */}
            <div className="relative">
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="0.01"
                step="0.01"
                className="block px-4 pb-2.5 pt-5 pr-16 w-full text-base text-white bg-[#111418] rounded-lg border border-border-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary peer"
                placeholder=" "
              />
              <label className="absolute text-sm text-slate-400 duration-200 transform -translate-y-3 scale-90 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-primary">
                Amount *
              </label>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                MAD
              </span>
            </div>
          </div>

          {/* Warning Box */}
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 flex gap-3">
            <span className="material-symbols-outlined text-orange-500">warning</span>
            <div className="text-sm text-slate-300">
              <p className="font-medium mb-1">Important</p>
              <ul className="text-slate-400 space-y-1">
                <li>• Please verify the account numbers before proceeding</li>
                <li>• Ensure sufficient balance in the source account</li>
                <li>• This operation cannot be undone</li>
              </ul>
            </div>
          </div>

          {/* Summary */}
          {formData.amount && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3">Transfer Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount:</span>
                  <span className="text-white font-mono font-medium">
                    {parseFloat(formData.amount).toFixed(2)} MAD
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fees:</span>
                  <span className="text-white font-mono">0.00 MAD</span>
                </div>
                <div className="h-px bg-border-dark my-2"></div>
                <div className="flex justify-between">
                  <span className="text-white font-semibold">Total:</span>
                  <span className="text-primary font-mono font-bold text-lg">
                    {parseFloat(formData.amount).toFixed(2)} MAD
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 px-6 py-3 bg-surface-dark hover:bg-[#3b4754] text-white font-medium rounded-lg transition-colors border border-border-dark"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-primary hover:bg-blue-600 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin material-symbols-outlined">
                    progress_activity
                  </span>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">send</span>
                  <span>Execute Transfer</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}