import axiosInstance from "../../api/axios";

export const getAllServices = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/services");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/services/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};

export const createServices = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/services", data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente", error);
  }
};

export const updateServices = async (data) => {
  try {
    console.log("Datos enviados al servidor:", data); // Verifica los datos enviados
    const response = await axiosInstance.put(
      `/api/v1/services/${data.Id}`,
      data
    );
    console.log("Respuesta del servidor:", response); // Inspecciona la respuesta
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el cliente:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteServices = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/services/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};
