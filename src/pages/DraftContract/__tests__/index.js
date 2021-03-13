import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../components/elements/Spinner';
import DraftContract from '../DraftContract';

jest.mock('../actions', () => ({
  fetchAccept: jest.fn(),
  fetchDraftContract: jest.fn(),
}));

useSelector.mockImplementation(fn => {
  fn({});
  return {
    isLoading: { s: false },
    message: '',
    url: 'url',
  };
});

describe('src/pages/DraftContract', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DraftContract />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading state, error state, & onClick', () => {
    const isLoading = { s: true };
    const message = 'error';

    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    useSelector.mockImplementationOnce(() => ({ isLoading, message }));
    const result = DraftContract();

    expect(result.props.children[2].props.children).toBe('error');

    const btnAccept = result.props.children[3].props.children[1];
    btnAccept.props.onClick();

    expect(btnAccept.props.children.type).toBe(Spinner);
    expect(dispatch).toHaveBeenCalled();
  });
});
