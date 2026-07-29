import api from "./api";

export const getProfile = async (token) => {
  const response = await api.get("/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateProfile = async (userData, token) => {
  const responce = await api.put("/user/profile", userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return responce.data;
};

export const uploadProfileImage = async (formData, token) => {
  const response = await api.put("/user/profile/image", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
