import axiosInstance from "../../api/axios";

export const register = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente", error);
  }
};


export const login = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente", error);
  }
};