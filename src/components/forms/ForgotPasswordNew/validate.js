import { isPassword } from '../../../utils/validation';

export default function validate(values) {
  const { password } = values;

  return {
    password: !isPassword(password) ? 'Minimal 6 karakter terdiri dari gabungan huruf dan angka' : '',
  };
}
