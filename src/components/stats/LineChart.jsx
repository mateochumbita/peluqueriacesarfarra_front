import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";



// Componente generalizado con transformación incluida
export default function LineChart({ data }) {
  const chartData = data.map((item) => ({
    label: item.mes,
    value: item.total,
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <RechartsLineChart data={chartData}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />

          <Line type="monotone" dataKey="value" stroke="#2563eb" dot />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
