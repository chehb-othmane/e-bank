import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { createClient } from "../services/ClientService";

export default function CreateClient() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    identityNumber: "",
    birthDate: "",
    address: "",
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
      await createClient(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/clients");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create client");
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
            <h2 className="text-white text-2xl font-bold mb-2">Client Created Successfully!</h2>
            <p className="text-slate-400 mb-4">
              The client has been created and their credentials have been sent via email.
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
              Create New Client
            </h1>
            <p className="text-[#9dabb9] text-base mt-2">
              Enter client information to create a new account
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-surface-dark rounded-xl border border-border-dark p-8 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className="block px-4 pb-2.5 pt-5 w-full text-base text-white bg-[#111418] rounded-lg border border-border-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary peer"
                  placeholder=" "
                />
                <label className="absolute text-sm text-slate-400 duration-200 transform -translate-y-3 scale-90 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-primary">
                  First Name *
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  className="block px-4 pb-2.5 pt-5 w-full text-base text-white bg-[#111418] rounded-lg border border-border-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary peer"
                  placeholder=" "
                />
                <label className="absolute text-sm text-slate-400 duration-200 transform -translate-y-3 scale-90 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-primary">
                  Last Name *
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="identityNumber"
                  value={formData.identityNumber}
                  onChange={handleChange}
                  required
                  className="block px-4 pb-2.5 pt-5 w-full text-base text-white bg-[#111418] rounded-lg border border-border-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary peer"
                  placeholder=" "
                />
                <label className="absolute text-sm text-slate-400 duration-200 transform -translate-y-3 scale-90 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-primary">
                  Identity Number (CIN) *
                </label>
              </div>

              <div className="relative">
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                  className="block px-4 pb-2.5 pt-5 w-full text-base text-white bg-[#111418] rounded-lg border border-border-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary peer"
                  placeholder=" "
                />
                <label className="absolute text-sm text-slate-400 duration-200 transform -translate-y-3 scale-90 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-primary">
                  Birth Date *
                </label>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block px-4 pb-2.5 pt-5 w-full text-base text-white bg-[#111418] rounded-lg border border-border-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary peer"
                  placeholder=" "
                />
                <label className="absolute text-sm text-slate-400 duration-200 transform -translate-y-3 scale-90 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-primary">
                  Email Address *
                </label>
              </div>

              <div className="relative">
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="block px-4 pb-2.5 pt-5 w-full text-base text-white bg-[#111418] rounded-lg border border-border-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary peer resize-none"
                  placeholder=" "
                ></textarea>
                <label className="absolute text-sm text-slate-400 duration-200 transform -translate-y-3 scale-90 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:text-primary">
                  Address
                </label>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex gap-3">
            <span className="material-symbols-outlined text-primary">info</span>
            <div className="text-sm text-slate-300">
              <p className="font-medium mb-1">Automatic Credentials</p>
              <p className="text-slate-400">
                A username and password will be automatically generated and sent to the client's email address.
              </p>
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
                  <span className="animate-spin material-symbols-outlined">progress_activity</span>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">person_add</span>
                  <span>Create Client</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}