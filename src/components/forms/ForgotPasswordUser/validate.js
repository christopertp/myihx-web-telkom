import { isEmail, isPhone } from '../../../utils/validation';

export default function validate(values) {
  const { user } = values;

  return {
    user: (!isEmail(user) && !isPhone(user)) ? 'Mohon masukkan nomor ponsel / email yang benar' : '',
  };
}
