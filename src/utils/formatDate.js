function formatDate(fechaISO) {
  if (!fechaISO) return '';
  const [año, mes, dia] = fechaISO.split('-');
  return `${dia}/${mes}/${año}`;
}

export default formatDate;