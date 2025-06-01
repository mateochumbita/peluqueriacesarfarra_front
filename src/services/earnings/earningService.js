import axiosInstance from "../../api/axios";

export const getAllEarnings = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/earnings");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};

export const getEarningsById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/earnings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};

export const createEarnings = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/earnings", data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente", error);
  }
};

export const updateEarnings = async (data) => {
  try {
    console.log("Datos enviados al servidor:", data); // Verifica los datos enviados
    const response = await axiosInstance.put(
      `/api/v1/earnings/${data.Id}`,
      data
    );
    console.log("Respuesta del servidor:", response); // Inspecciona la respuesta
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el cliente:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteEarnings = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/earnings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};
