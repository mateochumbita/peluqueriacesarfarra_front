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

export const getAllAppointmentsDays = async () => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/appointments/day/`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener las citas del día:", error);
  }
}

export const createAppointments = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/appointments", data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente", error);
  }
};
// appointmentService.js
export const updateAppointments = async (id, data) => {
  try {
    console.log("ID del turno:", id);
    console.log("Datos enviados al servidor:", data);
    const response = await axiosInstance.put(
      `/api/v1/appointments/${id}`,
      data
    );
    console.log("Respuesta del servidor:", response);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el turno:", error.response?.data || error.message);
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
