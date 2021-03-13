import { ADDRESS_FETCHED, DATA_FETCHED, LOADING } from '../constants';
import reducer from '../reducer';

describe('src/pages/ShopInternet/reducer', () => {
  test('case ADDRESS_FETCHED', () => {
    const result = reducer({}, { type: ADDRESS_FETCHED, address: 'tes' });
    expect(result.isLoading.a).toBe(false);
    expect(result.address).toBe('tes');
  });

  test('case DATA_FETCHED', () => {
    const result = reducer({}, { type: DATA_FETCHED, packages: 'tes' });
    expect(result.isLoading.p).toBe(false);
    expect(result.packages).toBe('tes');
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: false, key: 'address' });
    expect(result.isLoading.a).toBe(false);
  });

  test('case default', () => {
    const result = reducer();
    expect(result.address).toBe('');
    expect(result.isLoading.a).toBe(true);
    expect(result.isLoading.p).toBe(true);
    expect(result.packages.length).toBe(0);
  });
});
