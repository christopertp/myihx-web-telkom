import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import ForgotPasswordNew from '../ForgotPasswordNew';

useSelector.mockImplementation(fn => {
  fn({});
  return { isLoading: false };
});

describe('src/components/forms/ForgotPasswordNew', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ForgotPasswordNew />);
    expect(tree).toMatchSnapshot();

    useSelector.mockImplementationOnce(() => ({ isLoading: true }));
    ForgotPasswordNew.defaultProps.handleSubmit();
    const result = ForgotPasswordNew({
      ...ForgotPasswordNew.defaultProps,
    });
    const button = result.props.children[2];
    expect(button.props.children.type).toBe(Spinner);
  });
});
