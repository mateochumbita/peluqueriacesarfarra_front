import axiosInstance from "../../api/axios";

export const getAllHairdressers = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/hairdressers");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};

export const getHairdressersById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/hairdressers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};

export const createHairdressers = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/hairdressers", data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente", error);
  }
};

export const updateHairdressers = async (data) => {
  try {
    console.log("Datos enviados al servidor:", data); // Verifica los datos enviados
    const response = await axiosInstance.put(
      `/api/v1/hairdressers/${data.Id}`,
      data
    );
    console.log("Respuesta del servidor:", response); // Inspecciona la respuesta
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el cliente:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteHairdressers = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/hairdressers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};
