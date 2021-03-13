import { DETAIL_FETCHED, FAILED, LOADING } from '../constants';
import reducer from '../reducer';

describe('src/pages/Installation/reducer', () => {
  test('case DETAIL_FETCHED', () => {
    const result = reducer({}, { type: DETAIL_FETCHED, address: {}, product: {}, schedule: {} });
    expect(result.isLoading.d).toBe(false);
  });

  test('case FAILED', () => {
    const result = reducer({}, { type: FAILED, message: 'error', key: 'd' });
    expect(result.isLoading.d).toBe(false);
    expect(result.message).toBe('error');
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: true, key: 'd' });
    expect(result.isLoading.d).toBe(true);
  });

  test('case default', () => {
    const result = reducer();
    expect(result.isLoading.d).toBe(true);
    expect(result.address).toBe('');
  });
});
