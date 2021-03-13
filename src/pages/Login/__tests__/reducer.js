import { FAILED, LOADING, OTP_SENT } from '../constants';
import reducer from '../reducer';

describe('src/pages/Login/reducer', () => {
  test('case FAILED', () => {
    const result = reducer({}, { type: FAILED, message: 'error' });
    expect(result.isLoading).toBe(false);
    expect(result.message).toBe('error');
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  test('case OTP_SENT', () => {
    const result = reducer({}, { type: OTP_SENT, userId: 'tes' });
    expect(result.isLoading).toBe(false);
    expect(result.message).toBe('');
    expect(result.userId).toBe('tes');
  });

  test('case default', () => {
    const result = reducer();
    expect(result.isLoading).toBe(false);
    expect(result.message).toBe('');
  });
});
