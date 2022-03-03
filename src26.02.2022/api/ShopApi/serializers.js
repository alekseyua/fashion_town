export const serializeParamsisNull = (data) => {
  for (const key in data) {
    const element = data[key];
    if(!element) {
        delete data[key]
    }
  }
  return data
};
