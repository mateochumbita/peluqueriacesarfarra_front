import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const citasSimuladas = {
  "2025-06-02": [
    { time: "10:00", desc: "Corte de Pelo" },
    { time: "11:30", desc: "Coloración" },
  ],
  "2025-06-03": [{ time: "09:00", desc: "Peinado" }],
};

export default function DayDetail() {
  const { fecha } = useParams();
  const navigate = useNavigate();

  const citas = citasSimuladas[fecha] || [];

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        ← Volver al Calendario
      </button>

      <h1 className="text-2xl font-bold mb-4">
        Turnos del {dayjs(fecha).format("DD/MM/YYYY")}
      </h1>

      {citas.length === 0 ? (
        <p className="text-gray-500">No hay turnos para este día.</p>
      ) : (
        citas.map((cita, i) => (
          <div key={i} className="mb-2 p-3 bg-blue-100 rounded border">
            <p className="font-semibold">⏰ {cita.time}</p>
            <p>{cita.desc}</p>
          </div>
        ))
      )}
    </div>
  );
}
