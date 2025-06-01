import { createContext, useContext, useState, useEffect } from "react";
import { getAllAppointments } from "../services/appointments/appointmentService";
import { getAllClientes } from "../services/clients/clientService";
import { getAllEarnings } from "../services/earnings/earningService";
import { getAllHairdressers } from "../services/hairdressers/hairdressersService";
import { getAllHairdressersServices } from "../services/hairdressers_services/hairdressers_servicesService";
import { getAllProfiles } from "../services/profiles/profilesService";
import { getAllServices } from "../services/services/servicesService";
import { getAllUsers } from "../services/users/usersService";

const AppDataContext = createContext();

export function AppDataProvider({ children }) {
  const [appointments, setAppointments] = useState(null);
  const [clients, setClients] = useState(null);
  const [earnings, setEarnings] = useState(null);
  const [hairdressers, setHairdressers] = useState(null);
  const [hairdressersServices, setHairdressersServices] = useState(null);
  const [profiles, setProfiles] = useState(null);
  const [services, setServices] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      const appointmentsRes = await getAllAppointments();
      setAppointments(appointmentsRes?.supabaseResults || []);

      const clientsRes = await getAllClientes();
      setClients(clientsRes?.supabaseResults || []);

      const earningsRes = await getAllEarnings();
      setEarnings(earningsRes?.supabaseResults || []);

      const hairdressersRes = await getAllHairdressers();
      setHairdressers(hairdressersRes?.supabaseResults || []);

      const hairdressersServicesRes = await getAllHairdressersServices();
      setHairdressersServices(hairdressersServicesRes?.supabaseResults || []);

      const profilesRes = await getAllProfiles();
      setProfiles(profilesRes?.supabaseResults || []);

      const servicesRes = await getAllServices();
      setServices(servicesRes?.supabaseResults || []);

      const usersRes = await getAllUsers();
      setUsers(usersRes?.supabaseResults || []);
    };

    fetchAll();
  }, []);

  const fetchServices = async () => {
    const updated = await getAllServices();
    const sorted = (updated?.supabaseResults || []).sort((a, b) => a.Id - b.Id);
    setServices(sorted);
  };

  const fetchClients = async () => {
    const updated = await getAllClientes();
    const sorted = (updated?.supabaseResults || []).sort((a, b) => a.Id - b.Id);
    setClients(sorted);
  };

  const fetchUsers = async () => {
    const updated = await getAllUsers();
    const sorted = (updated?.supabaseResults || []).sort((a, b) => a.Id - b.Id);
    setUsers(sorted);
  };

  const fetchHairdressers = async () => {
    const updated = await getAllHairdressers();
    const sorted = (updated?.supabaseResults || []).sort((a, b) => a.Id - b.Id);
    setHairdressers(sorted);
  };

  return (
    <AppDataContext.Provider
      value={{
        appointments, setAppointments,
        clients, setClients, fetchClients,
        earnings, setEarnings,
        hairdressers, setHairdressers, fetchHairdressers,
        hairdressersServices, setHairdressersServices,
        profiles, setProfiles,
        services, setServices, fetchServices,
        users, setUsers, fetchUsers,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}