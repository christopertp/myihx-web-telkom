import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { useSelector } from 'react-redux';
import Spinner from '../../../elements/Spinner';
import CompleteProfileVerifyID from '../CompleteProfileVerifyID';

useSelector.mockImplementation((fn) => {
  fn({});
  return { isLoading: false };
});

describe('src/components/forms/CompleteProfileVerifyID', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CompleteProfileVerifyID />);
    expect(tree).toMatchSnapshot();
    CompleteProfileVerifyID.defaultProps.handleSubmit();
  });

  test('render loading submit', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: true }));
    const result = CompleteProfileVerifyID({
      ...CompleteProfileVerifyID.defaultProps,
      message: 'test',
    });
    expect(result.props.children[2].props.children.type).toBe(Spinner);
  });
});
