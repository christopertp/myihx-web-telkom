import { reduxForm } from 'redux-form';
import ForgotPasswordNew from './ForgotPasswordNew';
import validate from './validate';

export default reduxForm({
  initialValues: {
    password: '',
  },
  form: 'forgotPasswordNew',
  validate,
})(ForgotPasswordNew);
