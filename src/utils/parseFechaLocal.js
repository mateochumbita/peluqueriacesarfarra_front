function parseFechaLocal(fechaStr) {
  const [anio, mes, dia] = fechaStr.split("-");
  return new Date(Number(anio), Number(mes) - 1, Number(dia)); // Mes empieza en 0
}
export default parseFechaLocal;