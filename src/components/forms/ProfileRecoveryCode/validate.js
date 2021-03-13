export default function validate(values) {
  const { recoveryCode } = values;

  return {
    recoveryCode: !recoveryCode ? 'Harus diisi' : '',
  };
}
