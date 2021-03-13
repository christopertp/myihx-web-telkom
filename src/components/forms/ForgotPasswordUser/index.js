import { reduxForm } from 'redux-form';
import ForgotPasswordUser from './ForgotPasswordUser';
import validate from './validate';

export default reduxForm({
  initialValues: {
    user: '',
  },
  form: 'forgotPasswordUser',
  validate,
})(ForgotPasswordUser);
