import { reduxForm } from 'redux-form';
import CompleteProfileVerifyID from './CompleteProfileVerifyID';
import validate from './validate';

export default reduxForm({
  initialValues: {
    idNumber: '',
  },
  form: 'completeProfileVerifyID',
  validate,
})(CompleteProfileVerifyID);
