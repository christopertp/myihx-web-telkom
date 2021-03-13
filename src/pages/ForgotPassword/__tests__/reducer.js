import { LOADING, REQUEST_CODE } from '../constants';
import reducer from '../reducer';

describe('src/pages/ForgotPassword/reducer', () => {
  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  test('case OTP_SENT', () => {
    const result = reducer({}, { type: REQUEST_CODE, userId: 'tes' });
    expect(result.isLoading).toBe(false);
    expect(result.userId).toBe('tes');
  });

  test('case default', () => {
    const result = reducer();
    expect(result.isLoading).toBe(false);
    expect(result.userId).toBe('');
  });
});
