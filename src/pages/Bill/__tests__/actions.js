import { billingInfo } from '../../../services/billing';
import * as actions from '../actions';
import { FAILED, FETCHED, LOADING } from '../constants';

jest.mock('../../../services/billing', () => ({
  billingInfo: jest.fn(),
}));

describe('src/pages/Bill/actions', () => {
  test('fetchBill', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const data = {
      billingPeriod: 'June 2020',
      details: [{
        amount: 3000,
        billName: 'MATERAI',
        billingInfo: 'FINNET SUBCA - BIMASAKTI'
      }],
      dueDate: '1 June 2020',
      status: 'UNPAID',
      totalAmount: 396525,
    };

    billingInfo.mockResolvedValueOnce({ data });
    await actions.fetchBill()(dispatch);
    expectTest(1, { type: LOADING, isLoading: true });
    expectTest(2, {
      type: FETCHED,
      billingPeriod: 'June 2020',
      details: [{
        amount: 3000,
        billName: 'MATERAI',
        billingInfo: 'FINNET SUBCA - BIMASAKTI'
      }],
      dueDate: '1 June 2020',
      status: 'UNPAID',
      totalAmount: 396525,
    });

    billingInfo.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchBill()(dispatch);
    expectTest(4, { type: FAILED, message: 'error' });
  });
});
