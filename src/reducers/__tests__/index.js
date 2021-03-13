import reducer from '../';

jest.mock('redux', () => ({
  combineReducers: v => v,
}));

describe('src/reducers', () => {
  test('reducer', () => {
    expect(typeof reducer).toBe('object');
  });
});
