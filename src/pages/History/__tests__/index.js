import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import ShallowRenderer from 'react-test-renderer/shallow';
import History, { Bill, BlankState, Notif, Overlay } from '../History';

jest.mock('../actions', () => ({
  fetchHistory: jest.fn(),
  notifiedAction: jest.fn(),
}));

jest.mock('../styles.scoped.css', () => ({
  loading: 'loading',
}));

moment.mockImplementation(() => ({
  format: () => '24 June 2020',
  month: () => ({ year: () => ({ format: () => 'June 2020' }) }),
}));

useSelector.mockImplementation(fn => {
  const data = [
    {
      period: '202004',
      channel: 'FINNET SUBCA - INDOMART',
      status: 'PAID',
      paymentDate: '20200407',
      paymentTime: '100856',
      totalAmount: 388000
    },
    {
      period: '202003',
      channel: 'FINNET SUBCA - ALFAMART',
      status: 'PAID',
      paymentTime: '100696',
      totalAmount: 123000
    }
  ];
  fn({});
  return { isLoading: { p: false }, data };
});

describe('src/pages/History', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<History />);
    expect(tree).toMatchSnapshot();

    useSelector.mockImplementationOnce(() => ({ message: 'test' }));
    const result1 = History();
    expect(result1.props.children[1].props.children[1].props.children.type).toBe(BlankState);
  });

  test('Bill', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Bill />);
    expect(tree).toMatchSnapshot();
  });

  test('render Bill Empty', () => {
    const setModalBill = jest.fn();
    useSelector.mockImplementationOnce(() => ({ isLoading: { p: false }, data: [], }));
    useState.mockImplementationOnce(() => [true, setModalBill]);
    const result = Bill();
    result.props.children[0].props.children[0].props.children[1].props.onClick();
    expect(setModalBill).toHaveBeenCalledWith(true);
    result.props.children[1].props.onClose();
    expect(setModalBill).toHaveBeenCalledWith(false);
  });

  test('render History Loading', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: { p: true }, data: [], }));
    const result = History();
    expect(result.props.children[1].props.children[1].props.className).toBe('loading');
  });

  test('render Bill Loading', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: { p: true } }));
    const result2 = Bill();
    expect(result2.props.children[0].props.children[0].type).toBe('span');
  });

  test('BlankState', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<BlankState />);
    expect(tree).toMatchSnapshot();
  });

  test('Notif', () => {
    const setNotif = jest.fn();
    useContext.mockImplementationOnce(() => ({ setNotif }));
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    const result1 = Notif({ message: 'test' });
    expect(result1).toBe(null);
    expect(setNotif).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    const result2 = Notif({ message: '' });
    expect(result2).toBe(null);
  });

  test('Overlay', () => {
    const setOverlay = jest.fn();
    useContext.mockImplementationOnce(() => ({ setOverlay }));

    const result = Overlay({ isSending: true });
    expect(result).toBe(null);
    expect(setOverlay).toHaveBeenCalledTimes(1);
  });
});
