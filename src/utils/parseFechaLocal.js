function parseFechaLocal(fechaStr) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(fechaStr)) return new Date('Invalid');

  const [anio, mes, dia] = fechaStr.split("-");
  return new Date(Number(anio), Number(mes) - 1, Number(dia));
}
export default parseFechaLocal;
