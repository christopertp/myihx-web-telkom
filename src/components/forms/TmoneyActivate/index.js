import { reduxForm } from 'redux-form';
import TmoneyActivate from './TmoneyActivate';
import validate from './validate';

export default reduxForm({
  initialValues: {
    password: '',
  },
  form: 'tmoneyActivate',
  validate,
})(TmoneyActivate);
