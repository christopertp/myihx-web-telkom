import { isPassword } from '../../../utils/validation';

export default function validate(values) {
  const { currentPassword, newPassword } = values;
  const isSame = () => {
    return currentPassword === newPassword ? 'Password tidak boleh sama' : '';
  };

  return {
    newPassword: !isPassword(newPassword) ? 'Minimal 6 karakter terdiri dari gabungan huruf dan angka' : isSame(),
  };
}
