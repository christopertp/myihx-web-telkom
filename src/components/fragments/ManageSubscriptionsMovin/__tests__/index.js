import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import ManageSubscriptionsMovin, { Overlay } from '../ManageSubscriptionsMovin';

useSelector.mockImplementation((fn) => {
  fn({});
  return {
    movin: [],
    isLoading: { d: false, s: false },
    fetchData: jest.fn(),
    message: '',
  };
});

describe('src/components/fragments/ManageSubscriptionsMovin', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ManageSubscriptionsMovin />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading', () => {
    const setConfirmation = jest.fn();
    const dispatch = jest.fn();
    useState.mockImplementationOnce((v) => [v, setConfirmation]);
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementationOnce(() => ({
      message: '',
      fetchData: jest.fn(),
      fetchSubmit: jest.fn(),
      isLoading: { d: true },
      movin: [],
    }));

    const result = ManageSubscriptionsMovin();
    expect(result.props.children[1].props.children.props.children[0].props.className).toBe(
      'loading',
    );
    result.props.children[2].props.onClose();
    expect(setConfirmation).toHaveBeenNthCalledWith(1, '');

    result.props.children[2].props.onRefuse();
    expect(setConfirmation).toHaveBeenNthCalledWith(2, '');

    result.props.children[2].props.onAccept();
    expect(dispatch).toHaveBeenCalled();
    expect(setConfirmation).toHaveBeenNthCalledWith(3, '');
  });

  test('render with data', () => {
    const setConfirmation = jest.fn();
    const dispatch = jest.fn();
    useState.mockImplementationOnce((v) => [v, setConfirmation]);
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementationOnce(() => ({
      message: '',
      fetchData: jest.fn(),
      fetchSubmit: jest.fn(),
      isLoading: { d: false },
      movin: [
        {
          id: '5efc327ad8910b0b72b03368',
          subscriberId: '122245251851',
          phoneNumber: '08121104879',
          startDate: '01 Jul 2020',
        },
      ],
    }));
    const result = ManageSubscriptionsMovin();
    const { children } = result.props;
    expect(children[1].props.children[0].props.children[1].props.children).toBe('08121104879');
    children[1].props.children[0].props.children[3].props.onClick();
    expect(setConfirmation).toHaveBeenNthCalledWith(1, '5efc327ad8910b0b72b03368');
  });

  test('render with error', () => {
    const setConfirmation = jest.fn();
    const dispatch = jest.fn();
    useState.mockImplementationOnce((v) => [v, setConfirmation]);
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementationOnce(() => ({
      message: 'test error',
      fetchData: jest.fn(),
      fetchSubmit: jest.fn(),
      isLoading: { d: false },
      movin: [],
    }));
    const result = ManageSubscriptionsMovin();
    const { children } = result.props;
    expect(children[1].props.children).toBe('test error');
  });

  test('Overlay', () => {
    const setOverlay = jest.fn();
    useContext.mockImplementationOnce(() => ({ setOverlay }));
    Overlay();
    expect(setOverlay).toHaveBeenCalledWith(false);
  });
});
