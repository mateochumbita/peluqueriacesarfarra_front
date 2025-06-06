function Card({ title, value, desc }) {
  return (
    <div className="bg-white rounded-lg border p-6 flex flex-col justify-between min-h-[110px]">
      <div className="text-gray-600 text-sm mb-1">{title}</div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-gray-500 text-xs">{desc}</div>
    </div>
  );
}


export default Card;