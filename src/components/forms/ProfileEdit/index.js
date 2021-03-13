import { reduxForm } from 'redux-form';
import ProfileEdit from './ProfileEdit';
import validate from './validate';

export default reduxForm({
  initialValues: {
    fullName: '',
    address: '',
    birthDate: '',
    gender: '',
  },
  form: 'profileEdit',
  validate,
})(ProfileEdit);
