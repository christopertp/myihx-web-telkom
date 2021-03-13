import { billingDetail } from '../../../services/billing';
import * as actions from '../actions';
import { FAILED, FETCHED, LOADING, RESET } from '../constants';

jest.mock('../../../services/billing', () => ({
  billingDetail: jest.fn(),
}));

describe('src/pages/Receipt/actions', () => {
  test('fetchBillingDetail', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    billingDetail.mockResolvedValueOnce({ data: 'tes' });
    await actions.fetchBillingDetail()(dispatch);
    expectTest(1, { isLoading: true, type: LOADING });
    expectTest(2, { type: FETCHED, data: 'tes' });

    billingDetail.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchBillingDetail()(dispatch);
    expectTest(4, { type: FAILED, message: 'error' });
  });

  test('resetData', () => {
    const result = actions.resetData();
    expect(result.type).toBe(RESET);
  });
});
