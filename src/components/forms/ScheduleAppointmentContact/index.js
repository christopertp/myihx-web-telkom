import { reduxForm } from 'redux-form';
import ScheduleAppointmentContact from './ScheduleAppointmentContact';
import validate from './validate';

export default reduxForm({
  initialValues: {
    fullName: '',
    mobileNumber: '',
  },
  form: 'scheduleAppointmentContact',
  validate,
})(ScheduleAppointmentContact);
