import api from "./api";

export const registerUser = async (userData) => {
  const responce = await api.post("/auth/register", userData);
  return responce.data;
};

export const loginUser = async (userData) => {
  const responce = await api.post("/auth/login", userData);
  return responce.data;
};
