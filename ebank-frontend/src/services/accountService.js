import api from "../api/axios";

export const createAccount = async (accountData) => {
  const res = await api.post("/accounts", null, {
    params: {
      rib: accountData.rib,
      clientId: accountData.clientId,
    },
  });
  return res.data;
};

export const getAccountsByClient = async (clientId) => {
  const res = await api.get(`/accounts/client/${clientId}`);
  return res.data;
};

export const getAccountByRib = async (rib) => {
  const res = await api.get(`/accounts/${rib}`);
  return res.data;
};