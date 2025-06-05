import axiosInstance from "../../api/axios";

export const getAllEarningsStats = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/earnings/stats");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};