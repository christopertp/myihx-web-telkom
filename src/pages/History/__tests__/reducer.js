import { DATA_FETCHED, FAILED, LOADING, NOTIFIED } from '../constants';
import reducer from '../reducer';

describe('src/pages/History/reducer', () => {
  test('case DATA_FETCHED', () => {
    const data = [
      {
        period: '202004',
        channel: 'FINNET SUBCA - INDOMART',
        status: 'PAID',
        paymentDate: '20200407',
        paymentTime: '100856',
        totalAmount: 388000
      }
    ];
    const result = reducer({}, { type: DATA_FETCHED, data });
    expect(result.isLoading.p).toBe(false);
    expect(result.data.length).toBe(1);
  });
  test('case FAILED', () => {
    const result = reducer({}, { type: FAILED, message: 'error' });
    expect(result.isLoading.b).toBe(false);
    expect(result.isLoading.p).toBe(false);
    expect(result.message).toBe('error');
  });
  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: true, key: 'p' });
    expect(result.isLoading.p).toBe(true);
  });
  test('case NOTIFIED', () => {
    const result = reducer({}, { type: NOTIFIED, notifMessage: 'notif sent' });
    expect(result.isLoading.b).toBe(false);
    expect(result.notifMessage).toBe('notif sent');
  });
  test('case default', () => {
    const result = reducer();
    expect(result.data.length).toBe(0);
    expect(result.isLoading.b).toBe(false);
    expect(result.isLoading.p).toBe(true);
    expect(result.message).toBe('');
    expect(result.notifMessage).toBe('');
  });
});
