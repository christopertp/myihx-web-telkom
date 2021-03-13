import { DATA_FETCHED, FAILED, LOADING } from '../constants';
import reducer from '../reducer';

describe('src/pages/Register/reducer', () => {
  test('case DATA_FETCHED', () => {
    const result = reducer({}, { type: DATA_FETCHED, topic: [{ topicId: '01', topicName: 'topic' }], });
    expect(result.isLoading.t).toBe(false);
    expect(result.topic[0].value).toBe('01');
    expect(result.topic[0].text).toBe('topic');
  });
  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: false, key: 't' });
    expect(result.isLoading.t).toBe(false);
  });
  test('case FAILED', () => {
    const result = reducer({}, { type: FAILED, message: 'error', key: 't' });
    expect(result.isLoading.t).toBe(false);
    expect(result.message).toBe('error');
  });
  test('case default', () => {
    const result = reducer();
    expect(result.isLoading.t).toBe(true);
    expect(result.topic.length).toBe(0);
  });
});
