import { reduxForm } from 'redux-form';
import PersonalDataReview from './PersonalDataReview';
import validate from './validate';

export default reduxForm({
  initialValues: {
    idNumber: '',
    motherName: '',
    name: '',
  },
  form: 'personalDataReview',
  validate,
})(PersonalDataReview);
