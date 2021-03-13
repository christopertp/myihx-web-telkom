import { reduxForm } from 'redux-form';
import CompleteProfileVerifyEmail from './CompleteProfileVerifyEmail' ;
import validate from './validate';

export default reduxForm({
  initialValues: {
    verificationCode: '',
  },
  form: 'completeProfileVerifyEmail',
  validate,
})(CompleteProfileVerifyEmail);
