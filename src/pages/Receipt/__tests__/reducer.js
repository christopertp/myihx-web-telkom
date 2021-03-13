import { FAILED, FETCHED, LOADING, RESET } from '../constants';
import reducer from '../reducer';

describe('src/pages/Receipt/reducer', () => {
  test('case FAILED', () => {
    const data = { message: 'error' };
    const result = reducer({}, { type: FAILED, ...data });
    expect(result.isLoading).toBe(false);
    expect(result.message).toBe('error');
  });

  test('case FETCHED', () => {
    const data = {
      opbel: '954001805220',
      paymentDate: '20191015',
      paymentTime: '214530',
      paymentLocation: 'FPC FINNET KOPEGTEL',
      paymentDetail: [
        {
          detail: 'BIAYA INDIHOME',
          namount: 35000,
        },
        {
          detail: 'PAJAK',
          namount: 5000,
        },
      ],
      totalAmount: 45000,
    };
    const result = reducer({}, { type: FETCHED, data });
    expect(result.isLoading).toBe(false);
    expect(result.payId).toBe('954001805220');
    expect(result.payDate).toBe('20191015');
    expect(result.payTime).toBe('214530');
    expect(result.payLocation).toBe('FPC FINNET KOPEGTEL');
    expect(result.payDetail.length).toBe(2);
    expect(result.totalAmount).toBe(45000);
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  test('case RESET', () => {
    const result = reducer({}, { type: RESET });
    expect(result.isLoading).toBe(true);
    expect(result.payId).toBe('');
  });

  test('case default', () => {
    const result = reducer();
    expect(result.isLoading).toBe(true);
    expect(result.message).toBe('');
    expect(result.payId).toBe('');
    expect(result.payDate).toBe('');
    expect(result.payTime).toBe('');
    expect(result.payLocation).toBe('');
    expect(result.payDetail.length).toBe(0);
    expect(result.totalAmount).toBe('');
  });
});
