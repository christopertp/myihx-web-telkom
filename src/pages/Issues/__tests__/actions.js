import { getTicketComments, getTicketStatus, postTicketComment } from '../../../services/assurance';
import * as actions from '../actions';
import { COMMENT_POSTED, COMMENTS_FETCHED, FAILED, FETCHED, LOADING } from '../constants';

jest.mock('../../../services/assurance', () => ({
  getTicketComments: jest.fn(),
  getTicketStatus: jest.fn(),
  postTicketComment: jest.fn(),
}));

describe('src/pages/Issues/actions', () => {
  test('fetchComments', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    getTicketComments.mockResolvedValueOnce({ data: 'tes' });
    await actions.fetchComments()(dispatch);
    expectTest(1, { type: LOADING, isLoading: true, key: 'comments' });
    expectTest(2, { type: COMMENTS_FETCHED, comments: 'tes' });

    getTicketComments.mockRejectedValueOnce({});
    await actions.fetchComments()(dispatch);
    expectTest(4, { type: COMMENTS_FETCHED, comments: [], });
  });

  test('fetchData', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    getTicketStatus.mockResolvedValueOnce({ data: 'tes' });
    await actions.fetchData()(dispatch);
    expectTest(1, { type: LOADING, isLoading: true, key: 'detail' });
    expectTest(2, { type: FETCHED, data: 'tes' });

    getTicketStatus.mockRejectedValueOnce({});
    await actions.fetchData()(dispatch);
    expectTest(4, { type: FAILED, message: '404', key: 'detail' });
  });

  test('fetchPostComment', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    postTicketComment.mockResolvedValueOnce({ data: 'tes' });
    const cb = jest.fn();
    await actions.fetchPostComment('id', 'comment', cb)(dispatch);
    expectTest(1, { type: LOADING, isLoading: true, key: 'post' });
    expectTest(2, { type: COMMENT_POSTED, comment: { date: 'D/MM/YYYY', message: 'comment' } });
    expect(cb).toHaveBeenCalled();

    postTicketComment.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchPostComment()(dispatch);
    expectTest(4, { type: FAILED, message: 'error', key: 'post' });
  });
});
