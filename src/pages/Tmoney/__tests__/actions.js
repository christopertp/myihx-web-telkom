import { tmoneyChangePin, tmoneyHistory, tmoneyLink, tmoneyResetPin, tmoneySignup } from '../../../services/payment';
import * as actions from '../actions';
import { CLEAR_DIALOG, FAILED, HISTORY_CLEAR, HISTORY_FETCHED, LOADING, RESET_FINISHED, PIN_FAILED, TRANSACTION_FAILED } from '../constants';

jest.mock('../../../services/payment', () => ({
  tmoneyChangePin: jest.fn(),
  tmoneyHistory: jest.fn(),
  tmoneyLink: jest.fn(),
  tmoneyResetPin: jest.fn(),
  tmoneySignup: jest.fn(),
}));

describe('src/pages/Tmoney/actions', () => {
  test('fetchChangePin', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    tmoneyChangePin.mockResolvedValueOnce({ data: { status: 'SUCCESS' } });
    await actions.fetchChangePin()(dispatch);
    expectTest(1, { type: LOADING, key: 's', isLoading: true });
    expectTest(2, { type: PIN_FAILED, pinMessage: '' });
    expectTest(3, '/tmoney');

    tmoneyChangePin.mockResolvedValueOnce({ data: { status: 'WRONG_PIN' } });
    await actions.fetchChangePin()(dispatch);
    expectTest(4, { type: LOADING, key: 's', isLoading: true });
    expectTest(5, { type: PIN_FAILED, pinMessage: 'Wrong PIN' });
    expectTest(6, '/tmoney/change-pin');

    tmoneyChangePin.mockRejectedValueOnce({ data: { status: 'RESET_PIN' } });
    const notif = [
      'Your PIN has been automatically reset.',
      'Your new PIN has been sent to your phone number',
    ].join(' ');
    const failedDialog = {
      title: 'Change PIN Failed',
      message: notif,
      to: '/tmoney',
      notif: { notif },
    };
    await actions.fetchChangePin()(dispatch);
    expectTest(7, { type: LOADING, key: 's', isLoading: true });
    expectTest(8, { type: TRANSACTION_FAILED, failedDialog });

    tmoneyChangePin.mockRejectedValueOnce({ data: { status: '' }, message: 'test' });
    await actions.fetchChangePin()(dispatch);
    expectTest(9, { type: LOADING, key: 's', isLoading: true });
    expectTest(10, { type: PIN_FAILED, pinMessage: 'test' });
  });

  test('fetchHistory', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    tmoneyHistory.mockResolvedValueOnce({ data: { balance: 0, histories: '' } });
    await actions.fetchHistory()(dispatch);
    expectTest(1, { type: LOADING, key: 'd', isLoading: true });
    expectTest(2, { type: HISTORY_FETCHED, balance: 0, histories: '' });

    tmoneyHistory.mockRejectedValueOnce({ message: 'test' });
    await actions.fetchHistory()(dispatch);
    expectTest(3, { type: LOADING, key: 'd', isLoading: true });
    expectTest(4, { type: LOADING, key: 'd', isLoading: false });
    expectTest(5, { type: FAILED, message: 'test' });
  });

  test('fetchReset', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    tmoneyResetPin.mockResolvedValueOnce({ data: { status: 'SUCCESS' } });
    await actions.fetchReset()(dispatch);
    expectTest(1, { type: RESET_FINISHED, resetFinished: false });
    expectTest(2, { type: LOADING, key: 'o', isLoading: true });
    expectTest(3, { type: LOADING, key: 's', isLoading: true });
    expectTest(4, { type: RESET_FINISHED, resetFinished: true });
    expectTest(5, 'tmoney');

    tmoneyResetPin.mockResolvedValueOnce({ data: { status: 'WRONG_PIN' } });
    const failedDialog = {
      title: 'Transaction Failed',
      message: 'Please try again later',
      to: '/tmoney',
    };
    await actions.fetchReset()(dispatch);
    expectTest(6, { type: RESET_FINISHED, resetFinished: false });
    expectTest(7, { type: LOADING, key: 'o', isLoading: true });
    expectTest(8, { type: LOADING, key: 's', isLoading: true });
    expectTest(9, { type: RESET_FINISHED, resetFinished: true });
    expectTest(10, { type: TRANSACTION_FAILED, failedDialog });

    tmoneyResetPin.mockRejectedValueOnce();
    await actions.fetchReset()(dispatch);
    expectTest(11, { type: RESET_FINISHED, resetFinished: false });
    expectTest(12, { type: LOADING, key: 'o', isLoading: true });
    expectTest(13, { type: LOADING, key: 's', isLoading: true });
    expectTest(14, { type: RESET_FINISHED, resetFinished: true });
    expectTest(15, { type: TRANSACTION_FAILED, failedDialog });
  });

  test('fetchLink', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    tmoneyLink.mockResolvedValueOnce({ data: { status: 'SUCCESS' } });
    await actions.fetchLink()(dispatch);
    expectTest(1, { type: LOADING, key: 's', isLoading: true });
    expectTest(2, '/tmoney');

    tmoneyLink.mockResolvedValueOnce({ data: { status: 'OHTER' } });
    const failedDialog = {
      title: 'Transaction Failed',
      message: 'Please try again later',
      to: '/profile',
    };
    await actions.fetchLink()(dispatch);
    expectTest(3, { type: LOADING, key: 's', isLoading: true });
    expectTest(4, { type: TRANSACTION_FAILED, failedDialog });

    tmoneyLink.mockRejectedValueOnce({ data: { status: 'ACCOUNT_BLOCKED' } });
    const failedDialog2 = {
      title: 'Account Blocked',
      message: [
        'Your account has been blocked for your safety.',
        'Please contact us to unblock your account.',
        'Call +62 21 3808888 or email customer service@tmoney.co.id.',
      ].join(' '),
      to: '/profile',
    };
    await actions.fetchLink()(dispatch);
    expectTest(5, { type: LOADING, key: 's', isLoading: true });
    expectTest(6, { type: TRANSACTION_FAILED, failedDialog: failedDialog2 });

    tmoneyLink.mockRejectedValueOnce({ data: { status: 'WRONG_PIN' } });
    await actions.fetchLink()(dispatch);
    expectTest(7, { type: LOADING, key: 's', isLoading: true });
    expectTest(8, { type: PIN_FAILED, pinMessage: 'Wrong PIN' });

    tmoneyLink.mockRejectedValueOnce({ data: { status: 'OTHER' } });
    await actions.fetchLink()(dispatch);
    expectTest(9, { type: LOADING, key: 's', isLoading: true });
    expectTest(10, { type: TRANSACTION_FAILED, failedDialog });
  });

  test('fetchSignup', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    tmoneySignup.mockResolvedValueOnce({ data: { status: 'SUCCESS' } });
    await actions.fetchSignup()(dispatch);
    expectTest(1, { type: LOADING, key: 's', isLoading: true });
    expectTest(2, { type: LOADING, key: 's', isLoading: false });
    expectTest(3, { type: FAILED, message: '' });
    expectTest(4, '/tmoney');

    const data = {
      status: 'OTHER',
      statusTitle: 'Transaction Failed',
      statusMessage: 'Please try again later',
    };
    tmoneySignup.mockResolvedValueOnce({ data });
    const failedDialog = {
      title: 'Transaction Failed',
      message: 'Please try again later',
      to: '/profile',
    };
    await actions.fetchSignup()(dispatch);
    expectTest(5, { type: LOADING, key: 's', isLoading: true });
    expectTest(6, { type: LOADING, key: 's', isLoading: false });
    expectTest(7, { type: FAILED, message: '' });
    expectTest(8, { type: TRANSACTION_FAILED, failedDialog });

    tmoneySignup.mockRejectedValueOnce({ message: 'test' });
    await actions.fetchSignup()(dispatch);
    expectTest(9, { type: LOADING, key: 's', isLoading: true });
    expectTest(10, { type: LOADING, key: 's', isLoading: false });
    expectTest(11, { type: FAILED, message: 'test' });
  });

  test('clearFailedDialog', () => {
    const result = actions.clearFailedDialog();
    expect(result.type).toBe(CLEAR_DIALOG);
  });

  test('clearHistory', () => {
    const result = actions.clearHistory();
    expect(result.type).toBe(HISTORY_CLEAR);
  });
});
