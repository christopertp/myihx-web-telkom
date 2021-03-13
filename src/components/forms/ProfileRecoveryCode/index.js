import { reduxForm } from 'redux-form';
import ProfileRecoveryCode from './ProfileRecoveryCode';
import validate from './validate';

export default reduxForm({
  initialValues: {
    recoveryCode: '',
  },
  form: 'profileRecoveryCode',
  validate,
})(ProfileRecoveryCode);
