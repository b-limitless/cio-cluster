export function hasError(object: { [x: string]: any } | null) {
  if(!object) return null;
  const values = Object.values(object);

  for (let i = 0; i < values.length; i++) {
    if (values[i]) {
      return true;
    }
  }

  return false;
}
