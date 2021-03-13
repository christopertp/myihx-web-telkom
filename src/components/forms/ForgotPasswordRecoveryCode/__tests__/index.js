import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import ForgotPasswordRecoveryCode from '../ForgotPasswordRecoveryCode';

useSelector.mockImplementation(fn => {
  fn(({ login: '' }));
  return { isLoading: false, message: '' };
});

describe('src/components/forms/ForgotPasswordRecoveryCode', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ForgotPasswordRecoveryCode />);
    expect(tree).toMatchSnapshot();

    useSelector.mockImplementationOnce(() => ({ isLoading: true, message: 'error' }));
    ForgotPasswordRecoveryCode.defaultProps.handleSubmit();
    const result = ForgotPasswordRecoveryCode({
      ...ForgotPasswordRecoveryCode.defaultProps,
    });
    const button = result.props.children[1];
    expect(button.props.children.type).toBe(Spinner);
  });
});
