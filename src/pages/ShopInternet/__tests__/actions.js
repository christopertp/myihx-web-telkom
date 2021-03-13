import { coverageAddress, mostPopular } from '../../../services/product';
import * as actions from '../actions';
import { ADDRESS_FETCHED, DATA_FETCHED, LOADING } from '../constants';

jest.mock('../../../services/product', () => ({
  coverageAddress: jest.fn(),
  mostPopular: jest.fn(),
}));

describe('src/pages/ShopInternet/actions', () => {
  test('fetchAddress', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const address = {
      addressDescription: 'description',
      city: 'city',
      district: 'district',
      street: 'street',
      postalCode: 'postalCode',
      province: 'province',
    };
    const data = {
      installationAddress: { ...address, description: 'description' },
    };

    coverageAddress.mockResolvedValueOnce({ data });
    await actions.fetchAddress()(dispatch);
    expectTest(1, { isLoading: true, key: 'address', type: LOADING });
    expectTest(2, { type: ADDRESS_FETCHED, address });

    coverageAddress.mockRejectedValueOnce({});
    await actions.fetchAddress()(dispatch);
    expectTest(4, { type: ADDRESS_FETCHED, address: '' });
  });

  test('fetchMostPopular', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    mostPopular.mockResolvedValueOnce({ data: 'tes' });
    await actions.fetchMostPopular()(dispatch);
    expectTest(1, { isLoading: true, key: 'packages', type: LOADING });
    expectTest(2, { type: DATA_FETCHED, packages: 'tes' });

    mostPopular.mockRejectedValueOnce({});
    await actions.fetchMostPopular()(dispatch);
    expectTest(4, { type: DATA_FETCHED, packages: [], });
  });
});
