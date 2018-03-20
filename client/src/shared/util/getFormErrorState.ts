export function getFormErrorState (values: Array<any>) {
  if (!values.length) return false;
  let keys: Array<string> = [];

  values.forEach(value => {
    const currentKey = Object.keys(value)[0];
    if (!value[currentKey]) {
      keys.push(currentKey);
    }
  });

  const errors: any = {};
  keys.forEach(key => errors[key] = `${key} is required`);

  return errors;
}