import { DATA_FETCHED, FAILED, LOADING } from '../constants';
import reducer from '../reducer';

describe('src/pages/CompleteProfile/reducer', () => {
  test('case DATA_FETCHED', () => {
    const result = reducer(
      {},
      {
        type: DATA_FETCHED,
        data: {
          svmLevel: 0,
          completeProfile: true,
          verifiedEmail: false,
          subscribePackage: true,
          verifiedId: false,
          verifiedLocation: false,
        },
      },
    );
    expect(result.isLoading).toBe(false);
    expect(result.data.completeProfile).toBe(true);
    expect(result.message).toBe('');
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  test('case FAILED', () => {
    const result = reducer({}, { type: FAILED, message: 'test error' });
    expect(result.isLoading).toBe(false);
    expect(result.message).toBe('test error');
  });

  test('case default', () => {
    const result = reducer();
    expect(result.isLoading).toBe(false);
    expect(result.message).toBe('');
    expect(result.data).toStrictEqual({});
  });
});
