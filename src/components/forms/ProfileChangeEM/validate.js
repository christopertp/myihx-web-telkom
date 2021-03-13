import { isEmail, isPhone } from '../../../utils/validation';

export default function validate(values) {
  const { email, mobile } = values;

  return {
    email: !isEmail(email) ? 'Mohon cantumkan email yang aktif' : '',
    mobile: !isPhone(mobile) ? 'Mohon cantumkan nomor ponsel yang aktif' : '',
  };
}
