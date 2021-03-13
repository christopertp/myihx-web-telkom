import { isKTP, isPassport, isSIM } from '../../../utils/validation';

export default function validate(values) {
  const { idNumber } = values;
  return {
    idNumber:
      !isKTP(idNumber) && !isSIM(idNumber) && !isPassport(idNumber)
        ? 'Mohon masukkan id number yang benar'
        : '',
  };
}
