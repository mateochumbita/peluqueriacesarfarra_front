import axiosInstance from "../../api/axios";

export const getAllAppointments = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/appointments");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};

export const getAppointmentsById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};

export const createAppointments = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/appointments", data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente", error);
  }
};

export const updateAppointments = async (data) => {
  try {
    console.log("Datos enviados al servidor:", data); // Verifica los datos enviados
    const response = await axiosInstance.put(
      `/api/v1/appointments/${data.Id}`,
      data
    );
    console.log("Respuesta del servidor:", response); // Inspecciona la respuesta
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el cliente:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteAppointments = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};
