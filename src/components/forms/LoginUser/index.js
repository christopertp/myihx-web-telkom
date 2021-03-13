import { reduxForm } from 'redux-form';
import LoginUser from './LoginUser';
import validate from './validate';

export default reduxForm({
  initialValues: {
    user: '',
  },
  form: 'loginUser',
  validate,
})(LoginUser);
