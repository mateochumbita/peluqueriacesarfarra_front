import axiosInstance from "../../api/axios";

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/users");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};

export const getUsersById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};

export const createUsers = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/users", data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente", error);
  }
};

export const updateUsers = async (data) => {
  try {
    console.log("Datos enviados al servidor:", data); // Verifica los datos enviados
    const response = await axiosInstance.put(
      `/api/v1/users/${data.Id}`,
      data
    );
    console.log("Respuesta del servidor:", response); // Inspecciona la respuesta
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el cliente:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteUsers = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};
