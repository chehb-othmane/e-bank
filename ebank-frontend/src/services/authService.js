import api from "../api/axios";

export const login = async (username, password) => {
  const res = await api.post("/auth/login", { username, password });
  return res.data;
};

export const changePassword = async (oldPassword, newPassword) => {
  const res = await api.post("/auth/change-password", {
    oldPassword,
    newPassword,
  });
  return res.data;
};