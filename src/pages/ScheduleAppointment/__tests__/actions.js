import * as assurance from '../../../services/assurance';
import * as order from '../../../services/order';
import * as actions from '../actions';
import { ASSURANCE_FETCHED, DATE_FETCHED, FAILED, INFO_FETCHED, ISSUE_ID_FETCHED, LOADING } from '../constants';

jest.mock('../../../services/assurance', () => ({
  getSchedule: jest.fn(),
  postSchedule: jest.fn(),
}));

jest.mock('../../../services/order', () => ({
  getSchedule: jest.fn(),
  getSubscriptions: jest.fn(),
  postSchedule: jest.fn(),
}));

jest.mock('../../../utils/fetch', () => ({
  installation: jest.fn(),
  installationDate: jest.fn(),
  subscriptionsGet: jest.fn(),
}));

describe('src/pages/ScheduleAppointment/actions', () => {
  test('fetchPost', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    order.postSchedule.mockResolvedValueOnce();
    await actions.fetchPost({}, 'installation')(dispatch);
    expectTest(1, { isLoading: true, key: 'submit', type: LOADING });
    expectTest(2, { message: '', key: 'submit', type: FAILED });
    expectTest(3, '/schedule-installation/success');

    assurance.postSchedule.mockResolvedValueOnce({ data: { issueId: 'MIXN-01' } });
    await actions.fetchPost({ timeSlot: '' }, 'service')(dispatch);
    expectTest(5, { issueId: 'MIXN-01', type: ISSUE_ID_FETCHED });
    expectTest(6, '/schedule-service/success');

    order.postSchedule.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchPost({}, 'installation')(dispatch);
    expectTest(8, { message: 'error', key: 'submit', type: FAILED });
  });

  test('fetchDate', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    order.getSchedule.mockResolvedValueOnce({ data: { availability: 'tes' } });
    await actions.fetchDate('installation')(dispatch);
    expectTest(1, { isLoading: true, key: 'date', type: LOADING });
    expectTest(2, { date: 'tes', type: DATE_FETCHED });

    const dataService = {
      address: { description: 'address' },
      schedule: 'tes',
      issueSummary: { id: 'issue' },
    };
    assurance.getSchedule.mockResolvedValueOnce({ data: dataService });
    await actions.fetchDate('service')(dispatch);
    expectTest(4, { address: 'address', date: 'tes', issue: 'issue', type: ASSURANCE_FETCHED });

    order.getSchedule.mockRejectedValueOnce({ code: 404 });
    await actions.fetchDate('installation')(dispatch);
    expectTest(6, { message: '404', key: 'date', type: FAILED });

    order.getSchedule.mockRejectedValueOnce({});
    await actions.fetchDate('installation')(dispatch);
    expectTest(8, { message: 'error', key: 'date', type: FAILED });
  });

  test('fetchInstallationInfo', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const product = {
      flag: 'description',
      productId: 'id',
      internetPackage: { speed: 100 },
      packageName: 'name',
      price: 'price',
    };
    const installationAddress = { description: 'address' };
    const dataProduct = {
      description: 'description',
      id: 'id',
      mbps: 100,
      name: 'name',
      price: 'price',
    };
    order.getSubscriptions.mockResolvedValueOnce({ data: { product, installationAddress } });
    await actions.fetchInstallationInfo()(dispatch);
    expectTest(1, { isLoading: true, key: 'info', type: LOADING });
    expectTest(2, { address: 'address', product: dataProduct, type: INFO_FETCHED });

    order.getSubscriptions.mockRejectedValueOnce();
    await actions.fetchInstallationInfo()(dispatch);
    expectTest(4, { address: '', product: '', type: INFO_FETCHED });
  });
});
