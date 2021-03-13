import { reduxForm } from 'redux-form';
import ManageSubscriptionsPasswordWifiId from './ManageSubscriptionsPasswordWifiId';
import validate from './validate';

export default reduxForm({
  initialValues: {
    passwordWifiId: '',
  },
  form: 'manageSubscriptionsPasswordWifiId',
  validate,
})(ManageSubscriptionsPasswordWifiId);
