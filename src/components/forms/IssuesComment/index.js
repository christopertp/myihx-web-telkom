import { reduxForm } from 'redux-form';
import IssuesComment from './IssuesComment' ;
import validate from './validate';

export default reduxForm({
  initialValues: {
    message: '',
  },
  form: 'issuesComment',
  validate,
})(IssuesComment);
