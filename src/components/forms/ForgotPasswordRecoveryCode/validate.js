export default function validate(values) {
  const { code } = values;

  return {
    code: !code ? 'Harus diisi' : '',
  };
}
