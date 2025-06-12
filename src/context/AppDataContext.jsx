import { createContext, useContext, useState } from "react";
import { getAllAppointments, getAllAppointmentsDays } from "../services/appointments/appointmentService";

import { getAllClientes } from "../services/clients/clientService";
import { getAllEarnings } from "../services/earnings/earningService";
import { getAllHairdressers } from "../services/hairdressers/hairdressersService";
import { getAllHairdressersServices } from "../services/hairdressers_services/hairdressers_servicesService";
import { getAllProfiles } from "../services/profiles/profilesService";
import { getAllServices } from "../services/services/servicesService";
import { getAllUsers } from "../services/users/usersService";
import { getAllAppointmentsStats } from "../services/stats/appointmentsStatsService";
import { getAllClientesStats } from "../services/stats/clientStatsService";
import { getAllEarningsStats } from "../services/stats/earningsStats";

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
  const [appointmentsStats, setAppointmentsStats] = useState(null);
  const [clientsStats, setClientsStats] = useState(null);
  const [earningsStats, setEarningsStats] = useState(null);

  // Solo funciones para cargar los datos desde componentes
  const fetchAppointments = async () => {
    const res = await getAllAppointments();
    setAppointments(res?.supabaseResults || []);
  };

  const fetchAppointmentsDays = async () => {
    const res = await getAllAppointmentsDays();
    setAppointments(res?.supabaseResults || []);
  }
  const fetchAppointmentsStats = async () => {
    const res = await getAllAppointmentsStats();
    setAppointmentsStats(res || []);
  }
  const fetchClientsStats = async () => {
    const res = await getAllClientesStats();
    setClientsStats(res || []);
  }
  const fetchEarningsStats = async () => {
    const res = await getAllEarningsStats();
    setEarningsStats(res || []);
  }

  const fetchClients = async () => {
    const res = await getAllClientes();
    const sorted = (res?.supabaseResults || []).sort((a, b) => a.Id - b.Id);
    setClients(sorted);
  };

  const fetchEarnings = async () => {
    const res = await getAllEarnings();
    setEarnings(res?.supabaseResults || []);
  };

  const fetchHairdressers = async () => {
    const res = await getAllHairdressers();
    const sorted = (res?.supabaseResults || []).sort((a, b) => a.Id - b.Id);
    setHairdressers(sorted);
  };

  const fetchHairdressersServices = async () => {
    const res = await getAllHairdressersServices();
    setHairdressersServices(res?.supabaseResults || []);
  };

  const fetchProfiles = async () => {
    const res = await getAllProfiles();
    setProfiles(res?.supabaseResults || []);
  };

  const fetchServices = async () => {
    const res = await getAllServices();
    const sorted = (res?.supabaseResults || []).sort((a, b) => a.Id - b.Id);
    setServices(sorted);
  };

  const fetchUsers = async () => {
    const res = await getAllUsers();
    const sorted = (res?.supabaseResults || []).sort((a, b) => a.Id - b.Id);
    setUsers(sorted);
  };

  return (
    <AppDataContext.Provider
      value={{
        appointments, setAppointments, fetchAppointments,
        fetchAppointmentsDays,
        clients, setClients, fetchClients,
        earnings, setEarnings, fetchEarnings,
        hairdressers, setHairdressers, fetchHairdressers,
        hairdressersServices, setHairdressersServices, fetchHairdressersServices,
        profiles, setProfiles, fetchProfiles,
        services, setServices, fetchServices,
        users, setUsers, fetchUsers,
        appointmentsStats, setAppointmentsStats, fetchAppointmentsStats,
        clientsStats, setClientsStats, fetchClientsStats,
        earningsStats, setEarningsStats, fetchEarningsStats
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}
