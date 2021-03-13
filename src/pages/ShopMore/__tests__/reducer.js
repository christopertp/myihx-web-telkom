import { DATA_FETCHED, LOADING } from '../constants';
import reducer from '../reducer';

describe('src/pages/ShopMore/reducer', () => {
  test('case DATA_FETCHED', () => {
    const data = {
      logoImage: 'logo',
      hboShows: 'shows',
      aboutTheServices: 'about',
      benefits: 'benefits',
      popularDrama: 'drama',
      thrillingAction: 'action',
      howToUse: 'how'
    };
    const result = reducer({}, { type: DATA_FETCHED, ...data });
    expect(result.isLoading).toBe(false);
    expect(result.logoImage).toBe('logo');
    expect(result.hboShows).toBe('shows');
    expect(result.aboutTheServices).toBe('about');
    expect(result.benefits).toBe('benefits');
    expect(result.popularDrama).toBe('drama');
    expect(result.thrillingAction).toBe('action');
    expect(result.howToUse).toBe('how');
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  test('case default', () => {
    const result = reducer();
    expect(result.isLoading).toBe(true);
    expect(result.logoImage).toBe('');
    expect(result.hboShows).toStrictEqual([]);
    expect(result.aboutTheServices).toBe('');
    expect(result.benefits).toStrictEqual([]);
    expect(result.popularDrama).toStrictEqual([]);
    expect(result.thrillingAction).toStrictEqual([]);
    expect(result.howToUse).toStrictEqual([]);
  });
});
