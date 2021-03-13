import { billingDownload, billingHistory } from '../../../services/billing';
import * as actions from '../actions';
import { DATA_FETCHED, FAILED, LOADING, NOTIFIED } from '../constants';

jest.mock('../../../services/billing', () => ({
  billingDownload: jest.fn(),
  billingHistory: jest.fn(),
}));

describe('src/pages/History/actions', () => {
  test('fetchBillDownload', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    billingDownload.mockResolvedValueOnce({ data: { email: 'test@mail.com' } });
    await actions.fetchBillDownload()(dispatch);
    expectTest(1, { isLoading: true, key: 'b', type: LOADING });
    expectTest(2, { notifMessage: 'Bill statement has successfully sent to test@mail.com', type: NOTIFIED });

    billingDownload.mockRejectedValueOnce({ message: 'failed to be sent' });
    await actions.fetchBillDownload()(dispatch);
    expectTest(4, { notifMessage: 'failed to be sent', type: NOTIFIED });
  });

  test('fetchHistory', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    billingHistory.mockResolvedValueOnce({ data: 'test' });
    await actions.fetchHistory('bill')(dispatch);
    expectTest(1, { isLoading: true, key: 'p', type: LOADING });
    expectTest(2, { data: 'test', type: DATA_FETCHED });

    billingHistory.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchHistory('bill')(dispatch);
    expectTest(4, { message: 'error', type: FAILED });
  });
});
