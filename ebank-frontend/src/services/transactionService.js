import api from "../api/axios";

export const transfer = async (transferData) => {
  const res = await api.post("/transactions/transfer", transferData);
  return res.data;
};

export const getTransactionHistory = async (rib) => {
  const res = await api.get(`/transactions/history/${rib}`);
  return res.data;
};

export const getRecentTransactions = async (rib) => {
  const res = await api.get(`/transactions/recent/${rib}`);
  return res.data;
};