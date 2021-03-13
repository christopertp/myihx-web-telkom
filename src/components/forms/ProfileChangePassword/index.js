import { reduxForm } from 'redux-form';
import ProfileChangePassword from './ProfileChangePassword';
import validate from './validate';

export default reduxForm({
  initialValues: {
    currentPassword: '',
    newPassword: '',
  },
  form: 'profileChangePassword',
  validate,
})(ProfileChangePassword);
