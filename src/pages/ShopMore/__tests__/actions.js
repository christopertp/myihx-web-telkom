import { hboGo } from '../../../services/product';
import * as actions from '../actions';
import { DATA_FETCHED, LOADING } from '../constants';

jest.mock('../../../services/product', () => ({
  hboGo: jest.fn(),
}));

describe('src/pages/ShopMore/actions', () => {
  test('hboGo', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const data = {
      logoImage: 'logo',
      hboShows: 'shows',
      aboutTheServices: 'about',
      benefits: 'benefits',
      popularDrama: 'drama',
      thrillingAction: 'action',
      howToUse: 'how'
    };
    hboGo.mockResolvedValueOnce({ data });
    await actions.fetchHboGo()(dispatch);

    expectTest(1, { isLoading: true, type: LOADING });
    expectTest(2, {
      logoImage: 'logo',
      hboShows: 'shows',
      aboutTheServices: 'about',
      benefits: 'benefits',
      popularDrama: 'drama',
      thrillingAction: 'action',
      howToUse: 'how',
      type: DATA_FETCHED
    });

    hboGo.mockRejectedValueOnce();
    await actions.fetchHboGo()(dispatch);
    expectTest(4, { isLoading: false, type: LOADING });
  });
});
