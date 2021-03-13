import { reduxForm } from 'redux-form';
import SendFeedback from './SendFeedback';
import validate from './validate';

export default reduxForm({
  initialValues: {
    topicId: '',
    message: '',
  },
  form: 'sendFeedback',
  validate,
})(SendFeedback);
