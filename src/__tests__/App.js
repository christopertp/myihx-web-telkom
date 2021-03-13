import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { checkExpireTime, clearStorages, getToken } from '../utils/storage';
import App, { MainPages } from '../App';

jest.mock('react-hot-loader/root', () => ({ hot: c => c }));
jest.mock('../pages', () => ({ Login: 'login' }));
jest.mock('../utils/storage');

delete window.location;
window.location = { reload: jest.fn() };

describe('src/App', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn(),
      subscribe: jest.fn(),
    };
    const tree = shallow.render(<App history={{}} store={store} />);
    expect(tree).toMatchSnapshot();

    getToken.mockReturnValueOnce(false).mockReturnValueOnce(false);
    const result = App({ history: {}, store });
    const ErrorBoundary = result.props.children.props.children.props.children;
    const routes = ErrorBoundary.props.children.props.children;
    const beforeLoginRoutes = routes[0];
    expect(beforeLoginRoutes.key === 'Register').toBe(true);

    checkExpireTime.mockReturnValueOnce(true);
    const result2 = App({ history: {}, store });
    expect(clearStorages).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
    expect(result2).toBe(null);
  });

  test('MainPages', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MainPages />);
    expect(tree).toMatchSnapshot();
  });
});
