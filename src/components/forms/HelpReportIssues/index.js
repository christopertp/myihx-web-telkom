import { reduxForm } from 'redux-form';
import HelpReportIssues from './HelpReportIssues' ;
import validate from './validate';

export default reduxForm({
  initialValues: {
    type: '',
    issueId: '',
    message: '',
  },
  form: 'helpReportIssues',
  validate,
})(HelpReportIssues);
