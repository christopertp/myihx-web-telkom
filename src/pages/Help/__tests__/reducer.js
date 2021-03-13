import { FAILED, FETCHED, LOADING } from '../constants';
import reducer from '../reducer';

describe('src/pages/Help/reducer', () => {
  test('case FAILED', () => {
    const result = reducer({}, { type: FAILED, message: 'error', key: 'submit' });
    expect(result.isLoading.s).toBe(false);
    expect(result.message).toBe('error');
  });

  test('case FETCHED', () => {
    const result = reducer({}, { type: FETCHED, data: [], key: 'issues' });
    expect(result.isLoading.i).toBe(false);
    expect(result.data.issues.length).toBe(0);
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: false, key: 'issues' });
    expect(result.isLoading.i).toBe(false);
  });

  test('case default', () => {
    const result = reducer();
    expect(result.isLoading.c).toBe(true);
  });
});
