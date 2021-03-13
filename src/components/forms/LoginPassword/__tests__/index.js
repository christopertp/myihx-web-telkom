import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import LoginPassword from '../LoginPassword';

useSelector.mockImplementation(fn => {
  fn(({ login: '' }));
  return { isLoading: false, message: '' };
});

describe('src/components/forms/LoginPassword', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LoginPassword />);
    expect(tree).toMatchSnapshot();

    useSelector.mockImplementationOnce(() => ({ isLoading: true, message: 'error' }));
    LoginPassword.defaultProps.handleSubmit();
    const result = LoginPassword({
      ...LoginPassword.defaultProps,
    });
    const button = result.props.children[2];
    expect(button.props.children.type).toBe(Spinner);
  });
});
