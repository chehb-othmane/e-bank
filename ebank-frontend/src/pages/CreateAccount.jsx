import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { createAccount } from "../services/accountService";
import { getAllClients } from "../services/clientService";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingClients, setLoadingClients] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    rib: "",
    clientId: "",
  });

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await getAllClients();
      setClients(data);
    } catch (err) {
      setError("Failed to load clients");
    } finally {
      setLoadingClients(false);
    }
  };

  const generateRIB = () => {
    // Generate a random RIB (24 digits for Morocco)
    const rib = Array.from({ length: 24 }, () => Math.floor(Math.random() * 10)).join("");
    setFormData({ ...formData, rib });
  };

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
      await createAccount(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/clients");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create account");
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
            <h2 className="text-white text-2xl font-bold mb-2">
              Account Created Successfully!
            </h2>
            <p className="text-slate-400 mb-4">
              The bank account has been created with RIB: {formData.rib}
            </p>
            <p className="text-sm text-slate-500">Redirecting to client directory...</p>
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
              Create Bank Account
            </h1>
            <p className="text-[#9dabb9] text-base mt-2">
              Open a new bank account for an existing client
            </p>
          </div>
          <button
            onClick={() => navigate("/clients")}
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

        {/* Loading Clients */}
        {loadingClients ? (
          <div className="flex justify-center py-12">
            <span className="animate-spin material-symbols-outlined text-primary text-4xl">
              progress_activity
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-surface-dark rounded-xl border border-border-dark p-8 space-y-6"
          >
            {/* Client Selection */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Select Client</h3>
              <div className="relative">
                <select
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleChange}
                  required
                  className="block px-4 pb-2.5 pt-5 w-full text-base text-white bg-[#111418] rounded-lg border border-border-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer"
                >
                  <option value="">Select a client...</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.firstname} {client.lastname} - {client.email}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* RIB Generation */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Account Number (RIB)</h3>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="rib"
                    value={formData.rib}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{24}"
                    maxLength="24"
                    className="block px-4 pb-2.5 pt-5 w-full text-base text-white bg-[#111418] rounded-lg border border-border-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary peer font-mono"
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-slate-400 duration-200 transform -translate-y-3 scale-90 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-primary">
                    RIB (24 digits) *
                  </label>
                </div>
                <button
                  type="button"
                  onClick={generateRIB}
                  className="px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-lg transition-colors border border-primary/30 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">auto_awesome</span>
                  <span>Generate</span>
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Click "Generate" to create a random RIB or enter one manually
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex gap-3">
              <span className="material-symbols-outlined text-primary">info</span>
              <div className="text-sm text-slate-300">
                <p className="font-medium mb-1">Account Details</p>
                <ul className="text-slate-400 space-y-1">
                  <li>• Initial balance: 0.00 MAD</li>
                  <li>• Status: OPENED</li>
                  <li>• The account will be immediately active</li>
                </ul>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/clients")}
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
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">account_balance</span>
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}