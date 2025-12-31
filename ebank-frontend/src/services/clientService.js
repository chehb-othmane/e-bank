import api from "../api/axios";

export const createClient = async (clientData) => {
  const res = await api.post("/clients", clientData);
  return res.data;
};

export const getAllClients = async () => {
  const res = await api.get("/clients");
  return res.data;
};

export const getClientById = async (id) => {
  const res = await api.get(`/clients/${id}`);
  return res.data;
};