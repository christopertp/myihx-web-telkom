import { isPhone } from '../../../utils/validation';

export default function validate(values) {
  const { linkAjaNumber, amount } = values;

  return {
    linkAjaNumber: !isPhone(linkAjaNumber) ? 'Not a valid phone number' : '',
    amount: amount < 1000 ? 'Minimum amount is 1000' : '',
  };
}
