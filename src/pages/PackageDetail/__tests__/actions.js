import { subscriptions } from '../../../services/order';
import { mostPopularDetail } from '../../../services/product';
import * as actions from '../actions';
import { FAILED, FETCHED, LOADING, RESET } from '../constants';

jest.mock('../../../services/order', () => ({
  subscriptions: jest.fn(),
}));

jest.mock('../../../services/product', () => ({
  mostPopularDetail: jest.fn(),
}));

describe('src/pages/PackageDetail/actions', () => {
  test('fetchMostPopularDetail', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    mostPopularDetail.mockResolvedValueOnce({ data: 'tes' });
    await actions.fetchMostPopularDetail()(dispatch);
    expectTest(1, { isLoading: true, key: 'data', type: LOADING });
    expectTest(2, { type: FETCHED, data: 'tes' });

    mostPopularDetail.mockRejectedValueOnce({});
    await actions.fetchMostPopularDetail()(dispatch);
    expectTest(4, { type: FETCHED, data: '', });
  });

  test('fetchSubscribe', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    subscriptions.mockResolvedValueOnce({ data: { installationStatus: '' } });
    await actions.fetchSubscribe()(dispatch);
    expectTest(1, { isLoading: true, key: 'submit', type: LOADING });
    expectTest(2, '/check-coverage');

    subscriptions.mockResolvedValueOnce({ data: { installationStatus: { data: 'tes' } } });
    await actions.fetchSubscribe()(dispatch);
    expectTest(4, '/personal-data');

    subscriptions.mockRejectedValueOnce({ code: 404 });
    await actions.fetchSubscribe()(dispatch);
    expectTest(6, { code: 404, type: FAILED });

    subscriptions.mockRejectedValueOnce({});
    await actions.fetchSubscribe()(dispatch);
    expectTest(7, { isLoading: false, key: 'submit', type: LOADING });
  });

  test('resetData', () => {
    const result = actions.resetData();
    expect(result.type).toBe(RESET);
  });
});
