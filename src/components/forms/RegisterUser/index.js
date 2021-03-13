import { reduxForm } from 'redux-form';
import RegisterUser from './RegisterUser' ;
import validate from './validate';

export default reduxForm({
  initialValues: {
    email: '',
    mobileNumber: '',
    fullName: '',
    password: '',
    referralCode: '',
  },
  form: 'registerUser',
  validate,
})(RegisterUser);
