import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import IssuesComment from '../IssuesComment';

const { defaultProps } = IssuesComment;
const store = {
  message: 'error',
};

useSelector.mockImplementation(fn => {
  fn({});
  return store;
});

describe('src/components/forms/IssuesComment', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<IssuesComment />);
    expect(tree).toMatchSnapshot();
    defaultProps.handleSubmit();
  });
});
