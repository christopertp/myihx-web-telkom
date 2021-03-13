import { npsGet, npsPost } from '../../services/nps';
import { installationDetail } from '../../services/order';
import { DETAIL_FETCHED, FAILED, NPS_FETCHED, NPS_RESULT, LOADING } from './constants';

export function fetchInstallationDetail() {
  return async dispatch => {
    dispatch(loadingAction(true, 'detail'));
    try {
      const { data } = await installationDetail();
      const { installationAddress, subscription, schedule } = data;
      const address = installationAddress.description;
      const dataProduct = {
        description: subscription.flag,
        id: subscription.productId,
        mbps: subscription.internetPackage.speed,
        name: subscription.packageName,
        price: subscription.price,
      };
      const { scheduleAttempt, timeSlot } = schedule;

      dispatch(fetchedAction(address, dataProduct, scheduleAttempt, timeSlot, schedule.technician));
    } catch (err) {
      dispatch(failedAction(err.code === 404 ? '404' : 'error', 'detail'));
    }
  };
}

export function fetchNps() {
  const key = 'nps';
  return async dispatch => {
    dispatch(loadingAction(true, key));
    try {
      const { data } = await npsGet();
      dispatch(npsFetchedAction(data));
    } catch (err) {
      dispatch(resultAction(err.message));
    }
  };
}

export function fetchNpsSubmit(feedback, rating) {
  const key = 'submit';
  return async dispatch => {
    dispatch(loadingAction(true, key));
    try {
      await npsPost(feedback);
      dispatch(resultAction(rating > 3 ? 'THANKS' : 'OK'));
      dispatch(fetchNps());
    } catch (err) {
      dispatch(resultAction(err.message));
    }
  };
}

function fetchedAction(address, product, rescheduleAttempt, schedule, technician) {
  return { type: DETAIL_FETCHED, address, product, rescheduleAttempt, schedule, technician };
}

function failedAction(message, key) {
  return { type: FAILED, message, key };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}

function npsFetchedAction(questionnaires) {
  return { type: NPS_FETCHED, questionnaires };
}

function resultAction(npsMessage) {
  return { type: NPS_RESULT, npsMessage };
}
