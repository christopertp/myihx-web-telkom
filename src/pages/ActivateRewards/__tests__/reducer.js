import { FAILED, FETCHED, LOADING, RESET, COUNTER, USER, STATUS } from '../constants';
import reducer from '../reducer';

describe('src/pages/ActivateRewards/reducer', () => {
  test('case INACTIVE', () => {
    const data = { message: 'error' };
    const result = reducer({}, { type: FAILED, ...data });
    expect(result.isLoading).toBe(false);
    expect(result.message).toBe('error');
  });

  test('case FAILED', () => {
    const data = { message: 'error' };
    const result = reducer({}, { type: FAILED, ...data });
    expect(result.isLoading).toBe(false);
    expect(result.message).toBe('error');
  });

  test('case FETCHED', () => {
    const data = { 'deadlineOTP': 179, 'isLoading': false };
    const result = reducer({}, { type: FETCHED, data });
    expect(result.isLoading).toBe(false);
    expect(result.deadlineOTP).toBe(179);
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  test('case STATUS', () => {
    const data = {
      'data': {
        'terms': 'Lorem',
        'status': 'INACTIVE',
        'category': [
          {
            'name': 'Automotive',
            'icon': 'http://minio-myihx-dev-myihx-dev.vsan-apps.playcourt.id/assets/icons/rewards_automotive.png'
          }
        ]
      }
    };
    const result = reducer({}, { type: STATUS, ...data });
    expect(result.isActivated).toBe('INACTIVE');
    expect(result.terms).toBe('Lorem');
    expect(result.category.length).toBe(1);
  });

  test('case RESET', () => {
    const result = reducer({}, { type: RESET });
    expect(result.isLoading).toBe(true);
    expect(result.countOTP).toBe(2);
  });

  test('case USER MOBILE NUMBER', () => {
    const data = {
      'data': {
        'mobileNumber': '085318477979',
      }
    };
    const result = reducer({}, { type: USER, ...data });
    expect(result.mobileNumber).toBe('085318477979');
  });

  test('case COUNTER LESS 3 TIMES', () => {
    const data = {
      'success': false,
      'data': {
        'verifyAttempt': -2
      },
      'message': 'Otp not match',
    };
    const result = reducer({}, { type: COUNTER, ...data });
    expect(result.message).toBe('Too Many wrong attempts, please try again in 1 hour');
    expect(result.countOTP).toBe(-1);
  });

  test('case COUNTER HAVE 2 ATTEMPT LEFT', () => {
    const data = {
      'success': false,
      'data': {
        'verifyAttempt': 2
      },
      'message': 'Otp not match',
    };
    const result = reducer({}, { type: COUNTER, ...data });
    expect(result.message).toBe('Wrong code! You have 2 attempt(s) left');
    expect(result.countOTP).toBe(2);
  });

  test('case default', () => {
    const result = reducer();
    expect(result.isLoading).toBe(true);
    expect(result.message).toBe('');
    expect(result.status).toBe('');
    expect(result.mobileNumber).toBe('');
    expect(result.deadlineOTP).toBe(0);
    expect(result.terms).toBe('');
    expect(result.category.length).toBe(0);
    expect(result.countOTP).toBe(2);
    expect(result.isActivated).toBe('');
  });
});
