import api from "./api";

export const getProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};

export const registerUser = async (userData) => {
  const responce = await api.post("/user/register", userData);
  return responce.data;
};

export const loginUser = async (userData) => {
  const responce = await api.post("/user/login", userData);
  return responce.data;
};
