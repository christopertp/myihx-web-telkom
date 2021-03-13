import { DATA_FETCHED, FAILED, LOADING } from '../constants';
import reducer from '../reducer';

describe('src/pages/CheckCoverage/reducer', () => {
  test('case DATA_FETCHED', () => {
    const result = reducer({}, { type: DATA_FETCHED, key: 'provinces', data: 'tes' });
    expect(result.isLoading.p).toBe(false);
    expect(result.provinces).toBe('tes');
  });

  test('case FAILED', () => {
    const result = reducer({}, { type: FAILED, message: 'error' });
    expect(result.isLoading.submit).toBe(false);
    expect(result.message).toBe('error');
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: true, key: 'd' });
    expect(result.isLoading.d).toBe(true);
  });

  test('case default', () => {
    const result = reducer();
    expect(result.isLoading.p).toBe(true);
    expect(result.isLoading.d).toBe(false);
    expect(result.provinces.length).toBe(0);
  });
});
