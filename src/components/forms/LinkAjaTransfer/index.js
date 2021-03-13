import { reduxForm } from 'redux-form';
import LinkAjaTransfer from './LinkAjaTransfer';
import validate from './validate';

export default reduxForm({
  initialValues: {
    linkAjaNumber: '',
    amount: '',
  },
  form: 'linkAjaTransfer',
  validate,
})(LinkAjaTransfer);
