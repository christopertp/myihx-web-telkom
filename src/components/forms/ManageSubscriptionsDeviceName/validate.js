export default function validate(values) {
  const { deviceName } = values;

  return {
    deviceName: !deviceName ? 'Harus diisi' : '',
  };
}
