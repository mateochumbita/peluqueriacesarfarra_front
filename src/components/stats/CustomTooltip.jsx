const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow">
        <p className="font-semibold">{label}</p>
        <p className="text-blue-600">valor: {payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
