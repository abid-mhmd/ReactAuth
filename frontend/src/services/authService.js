import api from "./api";

export const registerUser = async (userData) => {
  const responce = await api.post("/users/register", userData);
  return responce.data;
};

export const loginUser = async (userData) => {
  const responce = await api.post("/users/login", userData);
  return responce.data;
};
