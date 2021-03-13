import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import ProfileEdit from '../ProfileEdit';

useSelector.mockImplementation(fn => {
  fn({});
  return {
    address: 'Jl. Garnisun No.1',
    dateOfBirth: '2000-11-01T00:00:00.000Z',
    fullName: 'telkom dev oye',
    gender: 'male',
    isLoading: { b: false, p: false },
  };
});

describe('src/components/forms/ProfileEdit', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProfileEdit />);
    expect(tree).toMatchSnapshot();
  });

  test('render Error Load', () => {
    useSelector.mockImplementationOnce(() => ({
      address: 'Jl. Garnisun No.1',
      dateOfBirth: '2000-11-01T00:00:00.000Z',
      fullName: '',
      gender: 'male',
      isLoading: { b: false, p: false },
    }));
    ProfileEdit.defaultProps.handleSubmit();
    const result = ProfileEdit({
      ...ProfileEdit.defaultProps,
    });
    expect(result).toBe('Something went wrong, please try again later.');
  });

  test('render Spinner', () => {
    useSelector.mockImplementationOnce(() => ({
      address: 'Jl. Garnisun No.1',
      dateOfBirth: '2000-11-01T00:00:00.000Z',
      fullName: 'telkom dev oye',
      gender: 'male',
      isLoading: { b: true, p: false },
    }));
    const result = ProfileEdit({
      ...ProfileEdit.defaultProps,
    });
    expect(result.props.children[3].props.children.type).toBe(Spinner);
  });

  test('render Message Error', () => {
    useSelector.mockImplementationOnce(() => ({
      address: 'Jl. Garnisun No.1',
      dateOfBirth: '2000-11-01T00:00:00.000Z',
      fullName: 'telkom dev oye',
      gender: 'male',
      isLoading: { b: false, p: false },
      message: 'error',
    }));
    const result = ProfileEdit({
      ...ProfileEdit.defaultProps,
    });
    expect(result.props.children[4].type).toBe('small');
  });
});
