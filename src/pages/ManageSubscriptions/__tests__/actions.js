import {
  getSubscriptions,
  deleteNumberMovin,
  updateAccountWifiid,
} from '../../../services/subscription';
import { DATA_FETCHED, LOADING, FAILED } from '../constants';
import * as actions from '../actions';

jest.mock('../../../services/subscription', () => ({
  getSubscriptions: jest.fn(),
  getSubscriptionMovin: jest.fn(),
  getSubscriptionWifiId: jest.fn(),
  updateAccountWifiid: jest.fn(),
  deleteNumberMovin: jest.fn(),
  updateDeviceWifiId: jest.fn(),
}));

describe('src/pages/ManageSubscriptions/actions', () => {
  test('fetchData', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const dataMock = [
      {
        type: 'WIFI_ID',
        name: 'Wifi.idseamless',
        description: 'Managewifi.idaccount',
        icon:
          'http://minio-myihx-dev-myihx-dev.vsan-apps.playcourt.id/assets/icons/ic_usage_wifi.png',
      },
    ];

    getSubscriptions.mockResolvedValueOnce({ data: dataMock });
    await actions.fetchData('subscriptions')(dispatch);
    expectTest(1, { isLoading: true, type: LOADING, key: 'd' });
    expectTest(2, {
      data: {
        subscriptions: dataMock,
      },
      key: 'd',
      type: DATA_FETCHED,
    });

    getSubscriptions.mockResolvedValueOnce({ data: []});
    await actions.fetchData('subscriptions')(dispatch);
    expectTest(4, { data: { subscriptions: []}, type: DATA_FETCHED, key: 'd' });

    getSubscriptions.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchData('subscriptions')(dispatch);
    expectTest(6, { key: 'd', message: 'error', type: FAILED });
  });

  test('fetchSubmit', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;
    const dataMock = { data: '', message: '', code: 200, success: true };

    deleteNumberMovin.mockResolvedValueOnce({ data: dataMock });
    await actions.fetchSubmit('removeNumberMovin', { deviceId: 123123 }, 'wifiId')(dispatch);
    expectTest(1, { isLoading: true, type: LOADING, key: 's' });
    expectTest(3, { key: 's', message: '', type: FAILED });

    deleteNumberMovin.mockResolvedValueOnce({ data: {} });
    await actions.fetchSubmit('removeNumberMovin', { deviceId: 123123 }, 'wifiId')(dispatch);
    expectTest(4, { isLoading: true, type: LOADING, key: 's' });
    expectTest(6, { key: 's', message: '', type: FAILED });
    deleteNumberMovin.mockResolvedValueOnce({ data: {} });

    await actions.fetchSubmit('removeNumberMovin', { deviceId: 123123 })(dispatch);
    expectTest(7, { isLoading: true, type: LOADING, key: 's' });
    expectTest(9, { key: 's', message: '', type: FAILED });

    deleteNumberMovin.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchSubmit('removeNumberMovin', { deviceId: 123123 }, 'wifiId')(dispatch);
    expectTest(11, { key: 's', message: 'error', type: FAILED });

    updateAccountWifiid.mockRejectedValueOnce({ data: dataMock });
    await actions.fetchSubmit(
      'updateAccountWifiId',
      { indihomeNumber: 123123 },
      'wifiId',
    )(dispatch);
    expectTest(7, { isLoading: true, type: LOADING, key: 's' });
  });
});
