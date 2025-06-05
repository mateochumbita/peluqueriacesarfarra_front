import axiosInstance from "../../api/axios";

export const getAllClientesStats = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/clients/stats");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};
