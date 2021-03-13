import { coverageAddress, mostPopular } from '../../services/product';
import { ADDRESS_FETCHED, DATA_FETCHED, LOADING } from './constants';

export function fetchAddress() {
  return async dispatch => {
    dispatch(loadingAction(true, 'address'));
    try {
      const { data } = await coverageAddress();
      const { installationAddress } = data;
      const { description, city, district, street, postalCode, province } = installationAddress;
      const address = {
        addressDescription: description,
        city,
        district,
        street,
        postalCode,
        province,
      };
      dispatch(addressFetchedAction(address));
    } catch (err) {
      dispatch(addressFetchedAction(''));
    }
  };
}

export function fetchMostPopular(type, search) {
  return async dispatch => {
    dispatch(loadingAction(true, 'packages'));
    try {
      const { data } = await mostPopular(type, search);
      dispatch(dataFetchedAction(data));
    } catch (err) {
      dispatch(dataFetchedAction([]));
    }
  };
}

function addressFetchedAction(address) {
  return { type: ADDRESS_FETCHED, address };
}

function dataFetchedAction(packages) {
  return { type: DATA_FETCHED, packages };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}
