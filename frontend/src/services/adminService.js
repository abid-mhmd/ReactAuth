import api from "./api";

export const getUsers = async (page, limit, token) => {
  const responce = await api.get(
    `/admin/dashboard?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return responce.data;
};

export const deleteUser = async (id, token) => {
  const response = await api.delete(`/admin/dashboard/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addUser = async (userData, token) => {
  const responce = await api.post("/admin/dashboard", userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return responce.data;
};

export const updateUser = async (id, userData, token) => {
  const responce = await api.put(`/admin/dashboard/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return responce.data;
};
