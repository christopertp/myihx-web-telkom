import { FETCHED, LOADING, RESET } from '../constants';
import reducer from '../reducer';

describe('src/pages/PackageDetail/reducer', () => {
  test('case FETCHED with data', () => {
    const data = {
      channels: [
        { category: 'cat-1' },
        { category: 'cat-1' },
        { category: 'cat-2' },
      ],
    };
    const result = reducer({}, { type: FETCHED, data });
    expect(result.isLoading.data).toBe(false);
    expect(result.data.channels.length).toBe(3);
    expect(result.data.channelsByCat['cat-1'].length).toBe(2);
    expect(result.data.channelsByCat['cat-2'].length).toBe(1);
  });

  test('case FETCHED no data', () => {
    const result = reducer({}, { type: FETCHED });
    expect(result.isLoading.data).toBe(false);
    expect(result.data).toBe('');
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: true, key: 'submit' });
    expect(result.isLoading.submit).toBe(true);
  });

  test('case RESET', () => {
    const result = reducer({}, { type: RESET });
    expect(result.isLoading.data).toBe(true);
    expect(result.data.channels.length).toBe(0);
    expect(result.data.productInfo.length).toBe(0);
  });

  test('case default', () => {
    const result = reducer();
    expect(result.isLoading.data).toBe(true);
    expect(result.data.channels.length).toBe(0);
    expect(result.data.productInfo.length).toBe(0);
  });
});
