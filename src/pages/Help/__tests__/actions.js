import { getIssues, getIssueStatus, createTicket, resetModem } from '../../../services/assurance';
import * as actions from '../actions';
import { FAILED, FETCHED, LOADING } from '../constants';

jest.mock('../../../services/assurance', () => ({
  getIssues: jest.fn(),
  getIssueStatus: jest.fn(),
  createTicket: jest.fn(),
  resetModem: jest.fn(),
}));

describe('src/pages/Help/actions', () => {
  test('fetchCreateTicket', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    createTicket.mockResolvedValueOnce({ data: { ticketType: 'Fisik' } });
    await actions.fetchCreateTicket()(dispatch);
    expectTest(1, { isLoading: true, key: 'submit', type: LOADING });
    expectTest(2, { message: '', key: 'submit', type: FAILED });
    expectTest(3, '/schedule-service');

    const data = { issueId: 'id', ticketType: 'Logic' };
    createTicket.mockResolvedValueOnce({ data });
    await actions.fetchCreateTicket()(dispatch);
    expectTest(6, '/issues/id');

    createTicket.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchCreateTicket()(dispatch);
    expectTest(8, { message: 'error', key: 'submit', type: FAILED });
  });

  test('fetchReportIssues', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const data = [{ issues: 'tes', symptomId: '01' }];
    const mapData = [{ text: 'tes', value: '01' }];

    getIssues.mockResolvedValueOnce({ data });
    await actions.fetchReportIssues('issues')(dispatch);
    expectTest(1, { isLoading: true, key: 'issues', type: LOADING });
    expectTest(2, { data: mapData, key: 'issues', type: FETCHED });

    getIssues.mockRejectedValueOnce({});
    await actions.fetchReportIssues('issues')(dispatch);
    expectTest(4, { data: [], key: 'issues', type: FETCHED });
  });

  test('fetchResetModem', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    resetModem.mockResolvedValueOnce();
    await actions.fetchResetModem()(dispatch);
    expectTest(1, { isLoading: true, key: 'reset', type: LOADING });
    expectTest(2, { data: 'success', key: 'reset', type: FETCHED });

    resetModem.mockRejectedValueOnce({ code: 500, message: 'error' });
    await actions.fetchResetModem()(dispatch);
    expectTest(4, { data: 'error', key: 'reset', type: FETCHED });

    resetModem.mockRejectedValueOnce({ code: 417, message: 'error' });
    await actions.fetchResetModem()(dispatch);
    expectTest(6, { data: '417', key: 'reset', type: FETCHED });
  });

  test('fetchStatusCard', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    getIssueStatus.mockResolvedValueOnce({ data: 'tes' });
    await actions.fetchStatusCard()(dispatch);
    expectTest(1, { isLoading: true, key: 'activity', type: LOADING });
    expectTest(2, { data: 'tes', key: 'activity', type: FETCHED });

    getIssueStatus.mockRejectedValueOnce();
    await actions.fetchStatusCard()(dispatch);
    expectTest(4, { data: '', key: 'activity', type: FETCHED });
  });

  test('mapData', () => {
    const data = [{ name: 'tes', categoryId: '01' }];
    expect(actions.mapData(data, 'categories')[0].text).toBe('tes');

    const data2 = [{ issues: 'telkom', symptomId: '02' }];
    expect(actions.mapData(data2, 'issues')[0].text).toBe('telkom');
  });
});
