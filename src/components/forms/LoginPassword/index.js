import { reduxForm } from 'redux-form';
import LoginPassword from './LoginPassword';
import validate from './validate';

export default reduxForm({
  initialValues: {
    password: '',
  },
  form: 'loginPassword',
  validate,
})(LoginPassword);
