export default function validate(values) {
  const { password } = values;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
  return {
    password: !regex.test(password) ? 'Password must contain at least 8 characters, one number and both lower and uppercase letters' : '',
  };
}
