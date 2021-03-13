import { FAILED, FETCHED, LOADING } from '../constants';
import reducer from '../reducer';

describe('src/pages/DraftContract/reducer', () => {
  test('case FAILED', () => {
    const result = reducer({}, { type: FAILED, message: 'error', key: 'submit' });
    expect(result.isLoading.s).toBe(false);
    expect(result.message).toBe('error');
  });

  test('case FETCHED', () => {
    const result = reducer({}, { type: FETCHED, url: 'url' });
    expect(result.isLoading.p).toBe(false);
    expect(result.message).toBe('');
    expect(result.url).toBe('url');
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: true, key: 'p' });
    expect(result.isLoading.p).toBe(true);
  });

  test('case default', () => {
    const result = reducer();
    expect(result.isLoading.p).toBe(true);
    expect(result.isLoading.s).toBe(false);
    expect(result.message).toBe('');
    expect(result.url).toBe('');
  });
});
