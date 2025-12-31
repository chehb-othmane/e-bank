import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getAllClients } from "../services/ClientService";

export default function ClientDirectory() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await getAllClients();
      setClients(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  // Filter clients based on search term
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.identityNumber?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = filteredClients.slice(startIndex, endIndex);

  // Get initials for avatar
  const getInitials = (firstname, lastname) => {
    return `${firstname?.charAt(0) || ""}${lastname?.charAt(0) || ""}`.toUpperCase();
  };

  // Get random gradient for avatar
  const getAvatarGradient = (index) => {
    const gradients = [
      "from-blue-500 to-purple-600",
      "from-orange-500 to-red-600",
      "from-teal-500 to-blue-500",
      "from-pink-500 to-rose-600",
      "from-green-500 to-emerald-600",
      "from-indigo-500 to-blue-600",
    ];
    return gradients[index % gradients.length];
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-3">
            <span className="animate-spin material-symbols-outlined text-primary text-5xl">
              progress_activity
            </span>
            <p className="text-slate-400">Loading clients...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-slate-400 text-sm font-medium hover:text-primary"
            >
              Home
            </button>
            <span className="text-slate-400 text-sm">/</span>
            <span className="text-primary text-sm font-medium">Client Directory</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-white text-3xl font-bold tracking-tight">
                Client Directory
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Manage, search, and view all registered banking clients.
              </p>
            </div>
            <button
              onClick={() => navigate("/clients/create")}
              className="px-5 py-2.5 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/20 transition text-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              Create New Client
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-surface-dark rounded-xl border border-border-dark p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </span>
            <input
              className="w-full bg-[#111418] border border-border-dark rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
              placeholder="Search by name, ID, or email..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={loadClients}
              className="bg-[#111418] border border-border-dark p-2.5 rounded-lg text-slate-400 hover:text-white hover:border-primary transition-colors"
              title="Refresh"
            >
              <span className="material-symbols-outlined text-[20px]">refresh</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface-dark rounded-xl border border-border-dark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-dark bg-[#111418]/50 text-xs uppercase tracking-wider text-slate-400">
                  <th className="p-4 font-semibold">Client Details</th>
                  <th className="p-4 font-semibold">Contact Info</th>
                  <th className="p-4 font-semibold">Identity Number</th>
                  <th className="p-4 font-semibold">Birth Date</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-border-dark">
                {currentClients.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <span className="material-symbols-outlined text-slate-600 text-5xl">
                          group_off
                        </span>
                        <p className="text-slate-400">
                          {searchTerm
                            ? "No clients found matching your search"
                            : "No clients found"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentClients.map((client, index) => (
                    <tr
                      key={client.id}
                      className="group hover:bg-[#111418] transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarGradient(
                              index
                            )} flex items-center justify-center text-white font-bold shadow-lg`}
                          >
                            {getInitials(client.firstname, client.lastname)}
                          </div>
                          <div>
                            <p className="font-bold text-white group-hover:text-primary transition-colors">
                              {client.firstname} {client.lastname}
                            </p>
                            <p className="text-slate-400 text-xs">ID: #{client.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[14px]">
                              mail
                            </span>
                            <span>{client.email}</span>
                          </div>
                          {client.address && (
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <span className="material-symbols-outlined text-[14px]">
                                location_on
                              </span>
                              <span className="truncate max-w-[200px]">
                                {client.address}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-white font-mono">{client.identityNumber}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-white">
                          {client.birthDate
                            ? new Date(client.birthDate).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/clients/${client.id}`)}
                            className="p-2 text-slate-400 hover:text-primary hover:bg-[#111418] rounded-lg transition-colors"
                            title="View Details"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              visibility
                            </span>
                          </button>
                          <button
                            className="p-2 text-slate-400 hover:text-white hover:bg-[#111418] rounded-lg transition-colors"
                            title="More Actions"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              more_vert
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredClients.length > 0 && (
            <div className="bg-surface-dark border-t border-border-dark p-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Showing{" "}
                <span className="text-white font-medium">
                  {startIndex + 1}-{Math.min(endIndex, filteredClients.length)}
                </span>{" "}
                of <span className="text-white font-medium">{filteredClients.length}</span>{" "}
                clients
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1.5 rounded-lg border border-border-dark text-slate-400 text-sm hover:text-white hover:border-slate-400 transition disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                          currentPage === pageNum
                            ? "bg-primary text-white"
                            : "hover:bg-[#111418] text-slate-400"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="text-slate-400 text-sm px-1">...</span>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                          currentPage === totalPages
                            ? "bg-primary text-white"
                            : "hover:bg-[#111418] text-slate-400"
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>
                <button
                  className="px-3 py-1.5 rounded-lg border border-border-dark text-slate-400 text-sm hover:text-white hover:border-slate-400 transition disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}