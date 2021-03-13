import { reduxForm } from 'redux-form';
import CheckCoverageAddress from './CheckCoverageAddress' ;
import validate from './validate';

export default reduxForm({
  initialValues: {
    provinceCode: '',
    cityCode: '',
    districtCode: '',
    streetCode: '',
    addressDescription: '',
    rtRw: '',
    postalCode: '',
  },
  form: 'checkCoverageAddress',
  validate,
})(CheckCoverageAddress);
