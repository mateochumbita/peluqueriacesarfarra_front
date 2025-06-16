import axiosInstance from "../../api/axios";

export const getAllClientes = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/clients");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};


export const getAllDisabledClientes = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/clients/disabled");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};

export const getClientesById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};

export const createClients = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/clients", data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente", error);
  }
};

export const updateClients = async (data) => {
  try {
    console.log("Datos enviados al servidor:", data); // Verifica los datos enviados
    const response = await axiosInstance.put(
      `/api/v1/clients/${data.Id}`,
      data
    );
    console.log("Respuesta del servidor:", response); // Inspecciona la respuesta
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el cliente:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteClients = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};



export const getClientByUserId = async (userId) => {
try {
  const response = await axiosInstance.get(`/api/v1/clients/user/${userId}`);
  return response.data;
} catch (error) {
  console.error("Error al obtener el cliente:", error);
}

}