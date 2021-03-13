import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import ProfileChangeEM from '../ProfileChangeEM';

useSelector.mockImplementation(fn => {
  fn({});
  return { isLoading: false, };
});

describe('src/components/forms/ProfileChangeEM', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProfileChangeEM />);
    expect(tree).toMatchSnapshot();

    useSelector.mockImplementationOnce(() => ({ isLoading: { b: true }, }));
    ProfileChangeEM.defaultProps.handleSubmit();
    const result = ProfileChangeEM({
      ...ProfileChangeEM.defaultProps,
    });
    const button = result.props.children[1];
    expect(button.props.children.type).toBe(Spinner);

    useParams.mockImplementationOnce(() => ({ page: 'change-email' }));
    useSelector.mockImplementationOnce(() => ({ isLoading: { b: false }, }));
    const result2 = ProfileChangeEM({
      ...ProfileChangeEM.defaultProps,
    });
    const field = result2.props.children[0];
    expect(field.props.name).toBe('email');
  });
});
