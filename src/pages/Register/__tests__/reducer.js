import { FAILED, LOADING, REGISTERED, VERIFIED } from '../constants';
import reducer from '../reducer';

describe('src/pages/Register/reducer', () => {
  test('case FAILED', () => {
    const result = reducer({}, { type: FAILED, message: 'error' });
    expect(result.isLoading).toBe(false);
    expect(result.message).toBe('error');
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  test('case REGISTERED', () => {
    const result = reducer({}, { type: REGISTERED, userId: 'test' });
    expect(result.isLoading).toBe(false);
    expect(result.message).toBe('');
    expect(result.userId).toBe('test');
  });

  test('case VERIFIED', () => {
    const result = reducer({}, { type: VERIFIED, accessToken: 'test', profilePicture: 'test.png' });
    expect(result.accessToken).toBe('test');
    expect(result.profilePicture).toBe('test.png');
  });

  test('case default', () => {
    const result = reducer();
    expect(result.isLoading). toBe(false);
    expect(result.message).toBe('');
  });
});
