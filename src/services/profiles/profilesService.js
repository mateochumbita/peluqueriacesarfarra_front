import axiosInstance from "../../api/axios";

export const getAllProfiles = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/profiles");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};

export const getProfilesById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/profiles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};

export const createProfiles = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/profiles", data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente", error);
  }
};

export const updateProfiles = async (data) => {
  try {
    console.log("Datos enviados al servidor:", data); // Verifica los datos enviados
    const response = await axiosInstance.put(
      `/api/v1/profiles/${data.Id}`,
      data
    );
    console.log("Respuesta del servidor:", response); // Inspecciona la respuesta
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el cliente:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteProfiles = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/profiles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};
