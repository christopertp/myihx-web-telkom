export default function validate(values) {
  const {
    verificationCode,
  } = values;
  return {
    verificationCode: !verificationCode ? 'Harus diisi' : '',
  };
}

