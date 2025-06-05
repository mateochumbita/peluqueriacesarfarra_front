import axiosInstance from "../../api/axios";

export const getAllAppointmentsStats = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/appointments/stats");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};