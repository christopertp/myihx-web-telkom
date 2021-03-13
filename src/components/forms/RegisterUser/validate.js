import { isEmail, isPhone, isPassword } from '../../../utils/validation';

export default function validate(values) {
  const { email, fullName, mobileNumber, password } = values;

  return {
    email: !isEmail(email) ? 'Mohon cantumkan email yang aktif' : '',
    mobileNumber: !isPhone(mobileNumber) ? 'Mohon cantumkan nomor ponsel yang aktif' : '',
    fullName: !fullName ? 'Mohon cantumkan nama lengkap Anda' : '',
    password: !isPassword(password) ? 'Minimal 6 karakter terdiri dari gabungan huruf dan angka' : '',
  };
}
