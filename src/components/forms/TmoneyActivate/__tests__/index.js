import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import TmoneyActivate from '../TmoneyActivate';

useSelector.mockImplementation(fn => {
  fn({});
  return { isLoading: { s: false } };
});

describe('src/components/forms/TmoneyActivate', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TmoneyActivate />);
    expect(tree).toMatchSnapshot();

    TmoneyActivate.defaultProps.handleSubmit();
  });

  test('render loading', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: { s: true } }));
    const result = TmoneyActivate({ ...TmoneyActivate.defaultProps });
    expect(result.props.children[1].props.children.type).toBe(Spinner);
  });
});
