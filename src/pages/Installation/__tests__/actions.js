import { installationDetail } from '../../../services/order';
import * as actions from '../actions';
import { DETAIL_FETCHED, FAILED, LOADING } from '../constants';

jest.mock('../../../services/order', () => ({
  installationDetail: jest.fn(),
}));

describe('src/pages/Installation/actions', () => {
  test('fetchInstallationDetail', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const schedule = {
      scheduleAttempt: 0,
      timeSlot: {
        date: 'test',
        partsOfDay: 'test',
        slot: 'test',
        time: 'test',
      },
      technician: 'test',
    };
    const subscription = {
      flag: 'test',
      productId: 'test',
      internetPackage: { speed: '0' },
      packageName: 'test',
      price: 'price',
    };
    const installationAddress = { description: 'address' };
    const dataProduct = {
      description: 'test',
      id: 'test',
      mbps: '0',
      name: 'test',
      price: 'price',
    };
    const dataSchedule = {
      date: 'test',
      slot: 'test',
      partsOfDay: 'test',
      time: 'test',
    };

    installationDetail.mockResolvedValueOnce({
      data: {
        installationAddress,
        schedule,
        subscription,
      }
    });
    await actions.fetchInstallationDetail()(dispatch);
    expectTest(1, { isLoading: true, key: 'detail', type: LOADING });
    expectTest(2, {
      address: 'address',
      product: dataProduct,
      rescheduleAttempt: 0,
      schedule: dataSchedule,
      technician: 'test',
      type: DETAIL_FETCHED
    });

    installationDetail.mockRejectedValueOnce({ code: 500 });
    await actions.fetchInstallationDetail()(dispatch);
    expectTest(4, { key: 'detail', message: 'error', type: FAILED });

    installationDetail.mockRejectedValueOnce({ code: 404 });
    await actions.fetchInstallationDetail()(dispatch);
    expectTest(6, { key: 'detail', message: '404', type: FAILED });
  });
});
