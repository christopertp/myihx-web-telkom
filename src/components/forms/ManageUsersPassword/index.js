import { reduxForm } from 'redux-form';
import ManageUsersPassword from './ManageUsersPassword';
import validate from './validate';

export default reduxForm({
  initialValues: {
    password: '',
  },
  form: 'manageUsersPassword',
  validate,
})(ManageUsersPassword);
