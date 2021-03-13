import { reduxForm } from 'redux-form';
import ForgotPasswordRecoveryCode from './ForgotPasswordRecoveryCode';
import validate from './validate';

export default reduxForm({
  initialValues: {
    code: '',
  },
  form: 'forgotPasswordRecoveryCode',
  validate,
})(ForgotPasswordRecoveryCode);
