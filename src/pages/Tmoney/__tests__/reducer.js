import { CLEAR_DIALOG, FAILED, HISTORY_CLEAR, HISTORY_FETCHED, LOADING, PIN_FAILED, RESET_FINISHED, TRANSACTION_FAILED } from '../constants';
import reducer from '../reducer';

describe('src/pages/Tmoney/reducer', () => {
  test('case CLEAR_DIALOG', () => {
    const result = reducer({}, { type: CLEAR_DIALOG });
    expect(result.failedDialog).toBe('');
  });

  test('case FAILED', () => {
    const result = reducer({}, { type: FAILED, message: 'test' });
    expect(result.message).toBe('test');
  });

  test('case HISTORY_CLEAR', () => {
    const result = reducer({}, { type: HISTORY_CLEAR });
    expect(result.histories.length).toBe(0);
    expect(result.historiesCompleted).toBe(false);
  });

  test('case HISTORY_FETCHED uncomplete', () => {
    const histories = [...Array.from({ length: 10 }).keys()].map(() => ({
      timestamp: '2020-06-25 16:36:03',
      transactionName: 'Isi Saldo TCASH',
      amount: -1000,
    }));

    const result = reducer({ histories: [], }, { type: HISTORY_FETCHED, histories });
    expect(result.histories.length).toBe(10);
    expect(result.historiesCompleted).toBe(false);
    expect(result.isLoading.d).toBe(false);
  });

  test('case HISTORY_FETCHED complete', () => {
    const histories = [{
      timestamp: '2020-06-25 18:53:34',
      transactionName: 'Terima Transfer',
      amount: 15000,
    }, {
      timestamp: '2020-06-25 16:36:03',
      transactionName: 'Isi Saldo TCASH',
      amount: -1000,
    }];

    const result = reducer({ histories: [], }, { type: HISTORY_FETCHED, histories });
    expect(result.histories.length).toBe(2);
    expect(result.historiesCompleted).toBe(true);
    expect(result.isLoading.d).toBe(false);
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, key: 'd', isLoading: true });
    expect(result.isLoading.d).toBe(true);

    const result1 = reducer({}, { type: LOADING, key: 'o', isLoading: true });
    expect(result1.isLoading.o).toBe(true);

    const result2 = reducer({}, { type: LOADING, key: 's', isLoading: true });
    expect(result2.isLoading.s).toBe(true);
  });

  test('case PIN_FAILED', () => {
    const result = reducer({}, { type: PIN_FAILED, pinMessage: 'test' });
    expect(result.isLoading.s).toBe(false);
    expect(result.pinMessage).toBe('test');
  });

  test('case RESET_FINISHED', () => {
    const result = reducer({}, {  type: RESET_FINISHED, resetFinished: true });
    expect(result.isLoading.o).toBe(false);
    expect(result.isLoading.s).toBe(false);
    expect(result.resetFinished).toBe(true);
  });

  test('case TRANSACTION_FAILED', () => {
    const failedDialog = {
      message: 'Please try again later.',
      title: 'Transaction Failed',
      to: '/profile',
    };
    const result = reducer({}, { type: TRANSACTION_FAILED, failedDialog });
    expect(result.failedDialog.message).toBe('Please try again later.');
    expect(result.failedDialog.title).toBe('Transaction Failed');
    expect(result.failedDialog.to).toBe('/profile');
    expect(result.isLoading.s).toBe(false);
  });

  test('case default', () => {
    const result = reducer();
    expect(result.balance).toBe('');
    expect(result.failedDialog).toBe('');
    expect(result.histories.length).toBe(0);
    expect(result.historiesCompleted).toBe(false);
    expect(result.isLoading.d).toBe(false);
    expect(result.isLoading.o).toBe(false);
    expect(result.isLoading.s).toBe(false);
    expect(result.message).toBe('');
    expect(result.pinMessage).toBe('');
    expect(result.resetFinished).toBe(false);
  });
});
