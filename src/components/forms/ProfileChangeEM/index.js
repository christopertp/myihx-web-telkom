import { reduxForm } from 'redux-form';
import ProfileChangeEM from './ProfileChangeEM';
import validate from './validate';

export default reduxForm({
  initialValues: {
    email: '',
    mobile: '',
  },
  form: 'profileChangeEM',
  validate,
})(ProfileChangeEM);
