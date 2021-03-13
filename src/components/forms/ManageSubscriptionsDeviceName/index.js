import { reduxForm } from 'redux-form';
import ManageSubscriptionsDeviceName from './ManageSubscriptionsDeviceName';
import validate from './validate';

export default reduxForm({
  initialValues: {
    deviceName: '',
  },
  form: 'manageSubscriptionsDeviceName',
  validate,
})(ManageSubscriptionsDeviceName);
