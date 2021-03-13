import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import ProfileChangePassword from '../ProfileChangePassword';

useSelector.mockImplementation(fn => {
  fn({});
  return { isLoading: { b: false } };
});

describe('src/components/forms/ProfileChangePassword', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProfileChangePassword />);
    expect(tree).toMatchSnapshot();

    useSelector.mockImplementationOnce(() => ({ isLoading: { b: true } }));
    ProfileChangePassword.defaultProps.handleSubmit();
    const result = ProfileChangePassword({
      ...ProfileChangePassword.defaultProps,
    });
    const button = result.props.children[3];
    expect(button.props.children.type).toBe(Spinner);
  });
});
