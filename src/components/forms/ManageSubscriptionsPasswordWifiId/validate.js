export default function validate(values) {
  const { passwordWifiId } = values;

  return {
    passwordWifiId: !passwordWifiId ? 'Harus diisi' : '',
  };
}
