import {
  postActivateReward,
  postVerifyOtp,
  postResendOtp,
  statusPoints,
} from '../../../services/rewards';
import { profile } from '../../../services/user';
import * as actions from '../actions';
import { FAILED, FETCHED, LOADING, RESET, STATUS, USER, COUNTER } from '../constants';

jest.mock('../../../services/rewards', () => ({
  postActivateReward: jest.fn(),
  postVerifyOtp: jest.fn(),
  statusPoints: jest.fn(),
  postResendOtp: jest.fn(),
}));

jest.mock('../../../services/user', () => ({
  profile: jest.fn(),
}));

describe('src/pages/ActivateRewards/actions', () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { href: jest.fn() };
  });

  afterAll(() => {
    window.location = location;
  });

  test('activateReward', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;


    const deadlineOTP = '2020-07-22T12:20:18.393Z';
    const nowDate = new Date().toISOString();
    const diffDate = Date.parse(deadlineOTP) - Date.parse(nowDate);
    const timeLeft = parseInt(diffDate / 1000);
    const data = {
      'category': [
        'Prize',
        'Shop',
        'Home and Appliances'
      ],
      'type': 'wa',
      'isLoading': false,
      'deadlineOTP': deadlineOTP,
    };
    const category = [
      'Prize',
      'Shop',
      'Home and Appliances'
    ];
    const type = 'wa';
    postActivateReward.mockResolvedValueOnce({ data });
    await actions.activateReward(category, type)(dispatch);
    expectTest(1, { isLoading: true, type: LOADING });
    expectTest(2, {
      type: FETCHED, data: {
        ...data,
        'deadlineOTP': timeLeft
      }
    });

    postActivateReward.mockRejectedValueOnce({ message: 'error' });
    await actions.activateReward()(dispatch);
    expectTest(4, { type: FAILED, message: 'error' });
  });

  test('verifyOtp', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;
    let data = {
      verifyAttempt: -22,
      status: 'success',
      message: 'Otp not match',
      success: false,
    };
    postVerifyOtp.mockResolvedValueOnce({ data });
    await actions.verifyOtp('1234')(dispatch);
    expectTest(1, { isLoading: true, type: LOADING });
    expectTest(2, '/activate-rewards/success');

    data = {
      ...data,
      status: 'failed',
    };

    postVerifyOtp.mockResolvedValueOnce({ data });
    await actions.verifyOtp('1234')(dispatch);
    expectTest(3, { isLoading: true, type: LOADING });
    expectTest(4, '/activate-rewards');

    let message = 'Otp not match';
    data = {
      ...data,
      verifyAttempt: -1,
      count: 1,
    };
    delete data['status'];

    postVerifyOtp.mockRejectedValueOnce({ data, message });
    await actions.verifyOtp('1234')(dispatch);
    expectTest(5, { isLoading: true, type: LOADING });
    expectTest(6, { message, type: FAILED });
    expectTest(7, { data, message, type: COUNTER });

    message = '';

    postVerifyOtp.mockRejectedValueOnce({ data, message });
    await actions.verifyOtp('1234')(dispatch);
    expectTest(8, { isLoading: true, type: LOADING });
    expectTest(9, { message, type: FAILED });
  });

  test('postResendOtp', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;
    const deadlineOTP = '2020-07-22T12:20:18.393Z';
    const nowDate = new Date().toISOString();
    const diffDate = Date.parse(deadlineOTP) - Date.parse(nowDate);
    const timeLeft = parseInt(diffDate / 1000);
    const data = {
      'isLoading': false,
      'deadlineOTP': deadlineOTP,
    };
    postResendOtp.mockResolvedValueOnce({ data });
    await actions.resendOtp({ request: { 'type': 'wa' } })(dispatch);
    expectTest(1, { isLoading: true, type: LOADING });
    expectTest(2, {
      type: FETCHED, data: {
        ...data,
        'deadlineOTP': timeLeft
      }
    });

    postResendOtp.mockRejectedValueOnce({ message: 'Cannot read property \'data\' of undefined' });
    await actions.resendOtp()(dispatch);
    expectTest(4, { type: FAILED, message: 'Cannot read property \'data\' of undefined' });
  });

  test('statusPoints', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;
    const data = {
      terms: 'Lorem',
      status: 'INACTIVE',
      category: [
        {
          'name': 'Automotive',
          'icon': 'http://minio-myihx-dev-myihx-dev.vsan-apps.playcourt.id/assets/icons/rewards_automotive.png'
        }
      ]
    };
    statusPoints.mockResolvedValueOnce({ data });
    await actions.fetchStatusRewards()(dispatch);
    expectTest(1, { isLoading: true, type: LOADING });
    expectTest(2, { type: STATUS, data });

    statusPoints.mockRejectedValueOnce({ message: 'Cannot read property \'data\' of undefined' });
    await actions.fetchStatusRewards()(dispatch);
    expectTest(4, { type: FAILED, message: 'Cannot read property \'data\' of undefined' });
  });

  test('fetchDataUser', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;
    const data = {
      'mobileNumber': '085318477979',
    };
    profile.mockResolvedValueOnce({ data });
    await actions.fetchDataUser()(dispatch);
    expectTest(1, { isLoading: true, type: LOADING });
    expectTest(2, { isLoading: false, type: LOADING });
    expectTest(3, { type: USER, data });

    profile.mockRejectedValueOnce({ message: 'Cannot read property \'data\' of undefined' });
    await actions.fetchDataUser()(dispatch);
    expectTest(4, { isLoading: true, type: LOADING });
  });

  test('resetData', () => {
    const result = actions.resetData();
    expect(result.type).toBe(RESET);
  });
});
