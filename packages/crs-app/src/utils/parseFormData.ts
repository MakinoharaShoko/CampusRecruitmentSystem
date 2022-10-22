export function parseFormData(values: any) {
  const formData = new FormData();
  // eslint-disable-next-line guard-for-in
  for (const key in values) {
    formData.append(key, values[key]);
  }
  return formData;
}
