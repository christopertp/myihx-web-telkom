import { push } from 'react-router-redux';
import * as order from '../../services/order';
import { availability, guestAvailability } from '../../services/product';
import { addressCities, addressDistricts, addressProvinces, addressStreets } from '../../services/user';
import { updateSyncErrors } from '../../utils/redux-form-actions';
import { clearGuestAddress, getToken, setGuestAddress } from '../../utils/storage';
import { DATA_FETCHED, FAILED, LOADING } from './constants';

export function fetchAddress(key, id1, id2, id3) {
  const apis = {
    cities: addressCities,
    districts: addressDistricts,
    provinces: addressProvinces,
    streets: addressStreets,
  };
  const fields = {
    cities: 'cityCode',
    districts: 'districtCode',
    provinces: 'provinceCode',
    streets: 'streetCode',
  };
  return async dispatch => {
    dispatch(loadingAction(true, key.charAt(0)));
    try {
      const { data } = await apis[key](id1, id2, id3);
      dispatch(dataFetchedAction(data, key));
    } catch (err) {
      const message = err.code === 404 ? 'Data tidak ditemukan' : 'Gagal memuat data';
      dispatch(dataFetchedAction([], key));
      dispatch(updateSyncErrors('checkCoverageAddress', fields[key], message));
    }
  };
}

export function fetchAvailability(payload) {
  return async dispatch => {
    const fn = getToken() ? availability : guestAvailability;
    dispatch(loadingAction(true, 'submit'));
    try {
      const { data } = await fn(payload);
      if (data.status === 'PT1') {
        setGuestAddress({
          ...data.installationAddress,
          addressDescription: payload.installationAddress.addressDescription,
        });
        dispatch(failedAction(''));
        dispatch(push('/check-coverage/pt1'));
      } else {
        dispatch(failedAction('Status unknown'));
      }
    } catch (err) {
      const { data, message } = err;
      if (!data) {
        dispatch(failedAction(message));
      } else if (data.status === 'PT2') {
        dispatch(failedAction('PT2'));
        clearGuestAddress();
      } else if (data.status === 'PT3') {
        dispatch(failedAction(''));
        dispatch(push('/check-coverage/pt3'));
        clearGuestAddress();
      } else {
        dispatch(failedAction(message));
      }
    }
  };
}

export function fetchSubscribe() {
  return async dispatch => {
    dispatch(loadingAction(true, 'submit'));
    try {
      await order.getSubscriptions();
      dispatch(push('/personal-data'));
    } catch (err) {
      dispatch(push('/shop/internet'));
      dispatch(loadingAction(false, 'submit'));
    }
  };
}

export function resetMessage() {
  return failedAction('');
}

function dataFetchedAction(data, key) {
  return { type: DATA_FETCHED, data, key };
}

function failedAction(message) {
  return { type: FAILED, message };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}
