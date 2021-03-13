import * as actions from '../actions';
import { verifyEmail, statusSVM } from '../../../services/user';
import { LOADING, FAILED, DATA_FETCHED } from '../constants';

jest.mock('../../../services/user', () => ({
  verifyEmail: jest.fn(),
  verifyId: jest.fn(),
  statusSVM: jest.fn(),
}));

describe('src/pages/CompleteProfile/actions', () => {
  test('fetchSubmit', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    verifyEmail.mockResolvedValueOnce({
      success: true,
      data: 'Success',
      message: 'Verify email success',
      code: 200,
    });
    await actions.fetchSubmit('verifyEmail', 236318, '/complete-profile')(dispatch);
    expectTest(1, { type: LOADING, isLoading: true });
    expectTest(2, '/complete-profile');

    verifyEmail.mockResolvedValueOnce({
      success: true,
      data: 'Success',
      message: 'Verify email success',
      code: 200,
    });
    await actions.fetchSubmit('verifyEmail', 236318)(dispatch);
    expectTest(3, { type: LOADING, isLoading: true });

    verifyEmail.mockRejectedValueOnce({
      success: false,
      data: '',
      message: 'Token is not valid!',
      code: 401,
    });
    await actions.fetchSubmit('verifyEmail', 236318, '/complete-profile')(dispatch);
    expectTest(4, { type: LOADING, isLoading: true });
    expectTest(5, { type: FAILED, message: 'Token is not valid!' });
  });

  test('fetchSVM', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    statusSVM.mockResolvedValueOnce({
      success: true,
      data: {
        svmLevel: 0,
        completeProfile: true,
        verifiedEmail: false,
        subscribePackage: true,
        verifiedId: false,
        verifiedLocation: false,
      },
      message: '',
      code: 200,
    });
    await actions.fetchStatusSvm()(dispatch);
    expectTest(1, { type: LOADING, isLoading: true });
    expectTest(2, {
      type: DATA_FETCHED,
      data: {
        svmLevel: 0,
        completeProfile: true,
        verifiedEmail: false,
        subscribePackage: true,
        verifiedId: false,
        verifiedLocation: false,
      },
    });

    statusSVM.mockRejectedValueOnce({
      success: false,
      data: {},
      message: 'test error',
      code: 400,
    });
    await actions.fetchStatusSvm()(dispatch);
    expectTest(3, { type: LOADING, isLoading: true });
    expectTest(4, { type: FAILED, message: 'test error' });
  });
});
