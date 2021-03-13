import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import RegisterUser from '../RegisterUser';

useEffect.mockImplementation(fn => fn());
useSelector.mockImplementation(fn => {
  fn(({ register: '' }));
  return { isLoading: false, message: '', userData: '' };
});

describe('src/components/forms/RegisterUser', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RegisterUser />);
    expect(tree).toMatchSnapshot();

    useSelector.mockImplementationOnce(() => ({ isLoading: true, message: 'error', userData: { fullName: 'test-name' } }));
    RegisterUser.defaultProps.handleSubmit();
    const result = RegisterUser({
      ...RegisterUser.defaultProps,
    });
    const button = result.props.children[5];
    expect(button.props.children.type).toBe(Spinner);
  });
});
