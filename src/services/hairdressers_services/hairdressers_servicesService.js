import axiosInstance from "../../api/axios";

export const getAllHairdressersServices = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/hairdressers-services");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};

export const getHairdressersServicesById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/hairdressers-services/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};

export const createHairdressersServices = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/hairdressers-services", data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente", error);
  }
};

export const updateHairdressersServices = async (data) => {
  try {
    console.log("Datos enviados al servidor:", data); // Verifica los datos enviados
    const response = await axiosInstance.put(
      `/api/v1/hairdressers-services/${data.Id}`,
      data
    );
    console.log("Respuesta del servidor:", response); // Inspecciona la respuesta
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el cliente:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteHairdressersServices = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/hairdressers-services/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};
