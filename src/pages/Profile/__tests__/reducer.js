import { DATA_FETCHED, FAILED, LOADING, TMONEY_FETCHED } from '../constants';
import reducer from '../reducer';

describe('src/pages/Profile/reducer', () => {
  test('case DATA_FETCHED', () => {
    const data = {
      address: 'Jl. Garnisun No.1',
    };
    const result = reducer({}, { type: DATA_FETCHED, data });
    expect(result.isLoading.p).toBe(false);
  });

  test('case FAILED', () => {
    const result = reducer({}, { type: FAILED, message: 'error' });
    expect(result.message).toBe('error');
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: true, key: 'p' });
    expect(result.isLoading.p).toBe(true);
  });

  test('case TMONEY_FETCHED', () => {
    const tmoney = { status: 'REGISTERED', balance: 22255 };
    const result = reducer({}, { type: TMONEY_FETCHED,  tmoney });
    expect(result.isLoading.t).toBe(false);
    expect(result.tmoney.status).toBe(tmoney.status);
    expect(result.tmoney.balance).toBe(tmoney.balance);
  });

  test('default', () => {
    const result = reducer();
    expect(result.address).toBe('');
    expect(result.isLoading.p).toBe(true);
  });
});
