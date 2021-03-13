import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import ForgotPasswordUser from '../ForgotPasswordUser';

useSelector.mockImplementation(fn => {
  fn(({ login: '' }));
  return { isLoading: false, message: '' };
});

describe('src/components/forms/ForgotPasswordUser', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ForgotPasswordUser />);
    expect(tree).toMatchSnapshot();

    useSelector.mockImplementationOnce(() => ({ isLoading: true, message: 'error' }));
    ForgotPasswordUser.defaultProps.handleSubmit();
    const result = ForgotPasswordUser({
      ...ForgotPasswordUser.defaultProps,
    });
    const button = result.props.children[1];
    expect(button.props.children.type).toBe(Spinner);
  });
});
