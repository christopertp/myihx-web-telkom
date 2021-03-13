import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import activateRewards from '../pages/ActivateRewards/reducer';
import bill from '../pages/Bill/reducer';
import checkCoverage from '../pages/CheckCoverage/reducer';
import completeProfile from '../pages/CompleteProfile/reducer';
import draftContract from '../pages/DraftContract/reducer';
import forgotPassword from '../pages/ForgotPassword/reducer';
import help from '../pages/Help/reducer';
import history from '../pages/History/reducer';
import home from '../pages/Home/reducer';
import installation from '../pages/Installation/reducer';
import issues from '../pages/Issues/reducer';
import linkaja from '../pages/LinkAja/reducer';
import login from '../pages/Login/reducer';
import manageSubscriptions from '../pages/ManageSubscriptions/reducer';
import order from '../pages/Order/reducer';
import packageCategory from '../pages/PackageCategory/reducer';
import packageDetail from '../pages/PackageDetail/reducer';
import payment from '../pages/Payment/reducer';
import personalData from '../pages/PersonalData/reducer';
import profile from '../pages/Profile/reducer';
import receipt from '../pages/Receipt/reducer';
import register from '../pages/Register/reducer';
import rewards from '../pages/Rewards/reducer';
import scheduleAppointment from '../pages/ScheduleAppointment/reducer';
import sendFeedback from '../pages/SendFeedback/reducer';
import shopInternet from '../pages/ShopInternet/reducer';
import shopMore from '../pages/ShopMore/reducer';
import tmoney from '../pages/Tmoney/reducer';
import nps from './nps';
import rescheduleInstallation from './rescheduleInstallation';

const rootReducer = combineReducers({
  activateRewards,
  bill,
  checkCoverage,
  completeProfile,
  draftContract,
  forgotPassword,
  form: formReducer,
  help,
  history,
  home,
  installation,
  issues,
  linkaja,
  login,
  manageSubscriptions,
  nps,
  packageCategory,
  order,
  packageDetail,
  payment,
  personalData,
  profile,
  receipt,
  register,
  rewards,
  rescheduleInstallation,
  scheduleAppointment,
  sendFeedback,
  shopInternet,
  shopMore,
  tmoney,
  routing: routerReducer,
});

export default rootReducer;
