// components/BarChart.js
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, title, label, formatAsCurrency = false }) => {
  // Preparar las etiquetas y los datos para el gráfico
  const labels = data.map((item) => item.label);
  const values = data.map((item) => item.value);

  // Configurar los datos del gráfico
  const chartData = {
    labels,
    datasets: [
      {
        label: label,
        data: values,
        backgroundColor: "rgba(59, 130, 246, 0.5)", 
        borderColor: "rgba(59, 130, 246, 1)", 
        borderWidth: 1,
      },
    ],
  };

  // Configurar las opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // Formatear los valores del eje Y como moneda
          callback: function (value) {
             return formatAsCurrency
              ? `$${value.toLocaleString()}`
              : value.toLocaleString();
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
