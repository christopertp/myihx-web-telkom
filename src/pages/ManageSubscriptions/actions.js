import {
  getSubscriptions,
  getSubscriptionMovin,
  getSubscriptionWifiId,
  deleteNumberMovin,
  updateDeviceWifiId,
  updateAccountWifiid,
} from '../../services/subscription';
import { FAILED, LOADING, DATA_FETCHED } from './constants';

export const fetchData = (type, param) => {
  const apis = {
    subscriptions: getSubscriptions,
    movin: getSubscriptionMovin,
    wifiId: getSubscriptionWifiId,
  };

  return async (dispatch) => {
    dispatch(loadingAction(true, 'd'));
    try {
      const { data } = await apis[type](param);
      dispatch(dataFetchedAction({ [type]: data }, 'd'));
    } catch (error) {
      dispatch(failedAction(error.message, 'd'));
    }
  };
};

export const fetchSubmit = (type, param, refetch = '') => {
  const apis = {
    removeNumberMovin: deleteNumberMovin,
    updateDeviceWifiId: updateDeviceWifiId,
    updateAccountWifiId: updateAccountWifiid,
  };

  return async (dispatch) => {
    dispatch(loadingAction(true, 's'));
    try {
      const id = param.deviceId || param.indihomeNumber;
      await apis[type](id, param.data);
      dispatch(fetchData(refetch, param.indihomeNumber));
      dispatch(failedAction('', 's'));
    } catch (error) {
      dispatch(failedAction(error.message, 's'));
    }
  };
};

function failedAction(message, key) {
  return { type: FAILED, message, key };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}

function dataFetchedAction(data, key) {
  return { type: DATA_FETCHED, data, key };
}
