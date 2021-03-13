import { isPhone } from '../../../utils/validation';

export default function validate(values) {
  const { fullName, mobileNumber } = values;

  return {
    fullName: !/^[a-zA-Z\s]+$/.test(fullName) ? 'Harus diisi dengan alfabet' : '',
    mobileNumber: !isPhone(mobileNumber) ? 'Mohon cantumkan nomor ponsel yang aktif' : '',
  };
}
