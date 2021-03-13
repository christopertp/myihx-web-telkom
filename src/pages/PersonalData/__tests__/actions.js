import { document, documentConfirm, documentUpdate, documentUpload } from '../../../services/user';
import * as actions from '../actions';
import { FAILED, FETCHED, LOADING } from '../constants';

jest.mock('../../../services/user', () => ({
  document: jest.fn(),
  documentConfirm: jest.fn(),
  documentUpdate: jest.fn(),
  documentUpload: jest.fn(),
}));

describe('src/pages/PersonalData/actions', () => {
  test('fetchConfirm', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    documentConfirm.mockResolvedValueOnce();
    await actions.fetchConfirm()(dispatch);
    expectTest(1, { isLoading: true, type: LOADING });
    expectTest(2, { message: '', type: FAILED });
    expectTest(3, '/personal-data/verify');

    documentConfirm.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchConfirm()(dispatch);
    expectTest(5, { message: 'error', type: FAILED });
  });

  test('fetchDocument', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    document.mockResolvedValueOnce({ data: 'data' });
    await actions.fetchDocument()(dispatch);
    expectTest(1, { isLoading: true, type: LOADING });
    expectTest(2, { data: 'data', type: FETCHED });

    document.mockRejectedValueOnce();
    await actions.fetchDocument()(dispatch);
    expectTest(4, { data: '', type: FETCHED });
  });

  test('fetchUpload', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    documentUpdate.mockResolvedValueOnce({ data: 'data' });
    await actions.fetchUpload('id', {}, 'edit')(dispatch);
    expectTest(1, { isLoading: true, type: LOADING });
    expectTest(2, { message: '', type: FAILED });
    expectTest(3, '/personal-data');

    documentUpload.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchUpload('id', {})(dispatch);
    expectTest(5, { message: 'error', type: FAILED });
  });
});
