import axios from 'axios';
import fetch, { getUrl } from '../fetch';

describe('src/utils/fetch', () => {
  test('fetch', async () => {
    const res = await fetch('url', 'get');
    expect(res).toBe('tes');

    axios.post.mockRejectedValueOnce({ response: '' });
    fetch('url', 'post').catch(err => {
      expect(err.code).toBe(500);
      expect(err.message).toBe('Failed to fetch data. Please contact developer.');
    });

    axios.get.mockRejectedValueOnce({ response: {} });
    fetch('url', 'get').catch(err => {
      expect(err.code).toBe(500);
      expect(err.message).toBe('Failed to fetch data. Please contact developer.');
    });

    axios.get.mockRejectedValueOnce({ response: { data: 'error' } });
    fetch('url', 'get').catch(err => {
      expect(err).toBe('error');
    });
  });

  test('getUrl', () => {
    const urls = ['prd', 'stg', 'dev'];

    process.env.MODE = 'production';
    expect(getUrl(urls)).toBe('prd');

    process.env.MODE = 'staging';
    expect(getUrl(urls)).toBe('stg');

    process.env.MODE = 'development';
    expect(getUrl(urls)).toBe('dev');
  });
});
