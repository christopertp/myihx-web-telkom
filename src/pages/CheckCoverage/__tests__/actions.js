import * as order from '../../../services/order';
import { availability, guestAvailability } from '../../../services/product';
import { addressProvinces } from '../../../services/user';
import { clearGuestAddress, getToken, setGuestAddress } from '../../../utils/storage';
import * as actions from '../actions';
import { DATA_FETCHED, FAILED, LOADING } from '../constants';

jest.mock('../../../services/order', () => ({
  getSubscriptions: jest.fn(),
}));

jest.mock('../../../services/product', () => ({
  availability: jest.fn(),
  guestAvailability: jest.fn(),
}));

jest.mock('../../../services/user', () => ({
  addressProvinces: jest.fn(),
}));

jest.mock('../../../utils/storage');

jest.mock('../../../utils/redux-form-actions', () => ({
  updateSyncErrors: (fo, fi, me) => [fo, fi, me].join('-'),
}));

describe('src/pages/CheckCoverage/actions', () => {
  test('fetchAddress', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    addressProvinces.mockResolvedValueOnce({ data: 'tes' });
    await actions.fetchAddress('provinces')(dispatch);
    expectTest(1, { isLoading: true, key: 'p', type: LOADING });
    expectTest(2, { type: DATA_FETCHED, data: 'tes', key: 'provinces' });

    addressProvinces.mockRejectedValueOnce({});
    await actions.fetchAddress('provinces')(dispatch);
    expectTest(4, { type: DATA_FETCHED, data: [], key: 'provinces' });
    expectTest(5, 'checkCoverageAddress-provinceCode-Gagal memuat data');

    addressProvinces.mockRejectedValueOnce({ code: 404 });
    await actions.fetchAddress('provinces')(dispatch);
    expectTest(8, 'checkCoverageAddress-provinceCode-Data tidak ditemukan');
  });

  test('fetchAvailability', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    availability.mockResolvedValueOnce({ data: { status: 'PT1' },  });
    await actions.fetchAvailability({ installationAddress: {} })(dispatch);
    expectTest(1, { isLoading: true, key: 'submit', type: LOADING });
    expectTest(2, { type: FAILED, message: '' });
    expectTest(3, '/check-coverage/pt1');
    expect(setGuestAddress).toHaveBeenCalled();

    availability.mockResolvedValueOnce({ data: { status: '' } });
    await actions.fetchAvailability()(dispatch);
    expectTest(5, { type: FAILED, message: 'Status unknown' });

    availability.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchAvailability()(dispatch);
    expectTest(7, { type: FAILED, message: 'error' });

    availability.mockRejectedValueOnce({ data: { status: 'PT2' } });
    await actions.fetchAvailability()(dispatch);
    expectTest(9, { type: FAILED, message: 'PT2' });

    availability.mockRejectedValueOnce({ data: { status: 'PT3' } });
    await actions.fetchAvailability()(dispatch);
    expectTest(11, { type: FAILED, message: '' });
    expectTest(12, '/check-coverage/pt3');
    expect(clearGuestAddress).toHaveBeenCalledTimes(2);

    getToken.mockImplementationOnce(() => false);
    guestAvailability.mockRejectedValueOnce({ data: {}, message: 'error' });
    await actions.fetchAvailability()(dispatch);
    expectTest(14, { type: FAILED, message: 'error' });
  });

  test('fetchSubscribe', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    order.getSubscriptions.mockResolvedValueOnce();
    await actions.fetchSubscribe()(dispatch);
    expectTest(1, { isLoading: true, key: 'submit', type: LOADING });
    expectTest(2, '/personal-data');

    order.getSubscriptions.mockRejectedValueOnce();
    await actions.fetchSubscribe()(dispatch);
    expectTest(4, '/shop/internet');
    expectTest(5, { isLoading: false, key: 'submit', type: LOADING });
  });

  test('resetMessage', () => {
    const result = actions.resetMessage();
    expect(result.message).toBe('');
    expect(result.type).toBe(FAILED);
  });
});
