import { FAILED, FETCHED, LOADING } from '../constants';
import reducer from '../reducer';

describe('src/pages/Bill/reducer', () => {
  test('case FAILED', () => {
    const data = { message: 'test' };
    const result = reducer({}, { type: FAILED, ...data });
    expect(result.isLoading).toBe(false);
    expect(result.message).toBe('test');
  });

  test('case FETCHED', () => {
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
    const result = reducer({}, { type: FETCHED, ...data });
    expect(result.isLoading).toBe(false);
    expect(result.message).toBe('');
    expect(result.billingPeriod).toBe('June 2020');
    expect(result.details).toStrictEqual([{
      amount: 3000,
      billName: 'MATERAI',
      billingInfo: 'FINNET SUBCA - BIMASAKTI'
    }]);
    expect(result.dueDate).toBe('1 June 2020');
    expect(result.status).toBe('UNPAID');
    expect(result.totalAmount).toBe(396525);
  });

  test('case LOADING', () => {
    const data = { isLoading: true };
    const result = reducer({}, { type: LOADING, ...data });
    expect(result.isLoading).toBe(true);
  });

  test('case default', () => {
    const result = reducer();
    expect(result.billingPeriod).toBe('');
    expect(result.details).toBe('');
    expect(result.dueDate).toBe('');
    expect(result.isLoading).toBe(true);
    expect(result.message).toBe('');
    expect(result.status).toBe('');
    expect(result.totalAmount).toBe(0);
  });
});
