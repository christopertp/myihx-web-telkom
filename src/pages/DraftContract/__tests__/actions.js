import { draftContract, draftContractAccept } from '../../../services/user';
import * as actions from '../actions';
import { FAILED, FETCHED, LOADING } from '../constants';

jest.mock('../../../services/user', () => ({
  draftContract: jest.fn(),
  draftContractAccept: jest.fn(),
}));

describe('src/pages/DraftContract/actions', () => {
  test('fetchDraftContract', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const data = { draftContract: 'draft' };
    draftContract.mockResolvedValueOnce({ data });
    await actions.fetchDraftContract()(dispatch);
    expectTest(1, { isLoading: true, key: 'pdf', type: LOADING });
    expectTest(2, { type: FETCHED, url: 'draft' });

    draftContract.mockRejectedValueOnce();
    await actions.fetchDraftContract()(dispatch);
    expectTest(4, { type: FAILED, message: 'Gagal memuat PDF', key: 'pdf' });
  });

  test('fetchAccept', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    draftContractAccept.mockResolvedValueOnce();
    await actions.fetchAccept()(dispatch);
    expectTest(1, { isLoading: true, key: 'submit', type: LOADING });
    expectTest(2, { type: FAILED, message: '', key: 'submit' });
    expectTest(3, { pathname: '/', state: { notif: 'Draft contract is accepted.' } });

    draftContractAccept.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchAccept()(dispatch);
    expectTest(5, { type: FAILED, message: 'error', key: 'submit' });
  });
});
