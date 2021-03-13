import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import LoginUser from '../LoginUser';

useSelector.mockImplementation(fn => {
  fn(({ login: '' }));
  return { isLoading: false, message: '' };
});

describe('src/components/forms/LoginUser', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LoginUser />);
    expect(tree).toMatchSnapshot();

    useSelector.mockImplementationOnce(() => ({ isLoading: true, message: 'error' }));
    LoginUser.defaultProps.handleSubmit();
    const result = LoginUser({
      ...LoginUser.defaultProps,
    });
    const button = result.props.children[1];
    expect(button.props.children.type).toBe(Spinner);
  });
});
