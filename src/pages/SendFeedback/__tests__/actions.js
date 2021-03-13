import { feedbackCategory, feedbackSend } from '../../../services/nps';
import * as actions from '../actions';
import { DATA_FETCHED, LOADING, FAILED } from '../constants';

jest.mock('../../../services/nps', () => ({
  feedbackCategory: jest.fn(),
  feedbackSend: jest.fn(),
}));

describe('src/pages/SendFeedback/actions', () => {
  test('fetchData', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const data = [{ topicId: '01', topicName: 'topic' }];

    feedbackCategory.mockResolvedValueOnce({ data });
    await actions.fetchData()(dispatch);
    expectTest(1, { isLoading: true, key: 'topic', type: LOADING, });
    expectTest(2, { type: DATA_FETCHED, topic: [{ topicId: '01', topicName: 'topic' }], });

    feedbackCategory.mockRejectedValueOnce();
    await actions.fetchData()(dispatch);
    expectTest(4, { type: DATA_FETCHED, topic: [], });
  });

  test('fetchSendFeedback', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    feedbackSend.mockResolvedValueOnce();
    await actions.fetchSendFeedback()(dispatch);
    expectTest(1, { isLoading: true, key: 'submit', type: LOADING, });
    expectTest(2, { 'pathname': '/profile', 'state': { 'notif': 'Feedback has been send successfully.' } });
    expectTest(3, { type: FAILED, message: '', key: 'submit' });

    feedbackSend.mockRejectedValueOnce();
    await actions.fetchSendFeedback()(dispatch);
    expectTest(5, { key: 'submit', message: 'Failed to send data. Please contact developer.', type: FAILED, });
  });
});
