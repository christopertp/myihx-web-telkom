export default function validate(values) {
  const { password } = values;

  return {
    password: !password ? 'Harus diisi' : '',
  };
}
