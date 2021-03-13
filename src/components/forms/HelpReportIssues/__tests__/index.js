import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import HelpReportIssues from '../HelpReportIssues';

const { defaultProps } = HelpReportIssues;
const store = {
  isLoading: { s: false },
  fetchReportIssues: jest.fn(),
  data: { categories: [], issues: [], },
  message: '',
};

useSelector.mockImplementation(fn => {
  fn({ form: { helpReportIssues: {} } });
  return store;
});

describe('src/components/forms/HelpReportIssues', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<HelpReportIssues />);
    expect(tree).toMatchSnapshot();
    defaultProps.handleSubmit();
  });

  test('render loading state', () => {
    const isLoading = { i: true };
    const message = 'error';
    useSelector.mockImplementationOnce(() => ({ ...store, isLoading, message }));
    const result = HelpReportIssues(defaultProps);
    expect(result.props.children[1].props.inputProps.placeholder).toBe('Loading...');
    expect(result.props.children[3].props.children).toBe('error');
  });

  test('fetch issues', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);
    useSelector
      .mockImplementationOnce(() => (store))
      .mockImplementationOnce(() => ({ type: '01' }));
    HelpReportIssues(defaultProps);
    expect(dispatch).toHaveBeenCalled();
  });
});
