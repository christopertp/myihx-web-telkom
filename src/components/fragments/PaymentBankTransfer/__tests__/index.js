import React, { useState, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import useTimer from '../../../../hooks/useTimer';
import PaymentBankTransfer, { ListBank, BankDetail, HowToPay, Notif, Timer } from '../PaymentBankTransfer';

useSelector.mockImplementation(fn => {
  fn({});
  return {
    amount: 392.50,
    code: '',
    bankInfo: [{
      codeBank: '',
      details: [{
        name: 'MOBILE',
        howToPay: [{
          header: 'dolor ipsum',
          description: 'dolor ipsum',
        }],
      }],
    }],
    fetchBankTransfer: jest.fn(),
    paymentCode: '396525',
    detailBank: {
      icon: '',
      details: [{
        name: 'MOBILE',
        howToPay: [{
          header: 'dolor ipsum',
          description: 'dolor ipsum',
        }],
      }],
    },
    deadline: '2020-06-27T03:00:00.043Z',
    loading: { b: false },
    message: 'tes',
    setMessageAction: jest.fn(),
  };
});

jest.mock('../../../../hooks/useTimer', () => jest.fn(() => ({
  time: ['', '', ''],
})));

describe('src/components/fragments/PaymentBankTransfer', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PaymentBankTransfer />);
    expect(tree).toMatchSnapshot();

    useParams.mockImplementationOnce(() => ({ bank: 'vamandiri' }));
    const result = PaymentBankTransfer();
    expect(result.props.children[0].type).toBe(BankDetail);

    useParams.mockImplementationOnce(() => ({ detail: 'bank-transfer' }));
    const result1 = PaymentBankTransfer();
    expect(result1.props.children[0].type).toBe(ListBank);
  });

  test('render loading state', () => {
    useSelector.mockImplementationOnce(() => ({ loading: { b: true } }));

    const result = BankDetail();
    expect(result.props.children[1].props.children.props.className).toBe('loading');
    expect(result.props.children[2].props.children[1].props.className).toBe('loading');
  });

  test('ListBank', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ListBank />);
    expect(tree).toMatchSnapshot();

    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    const result = ListBank();
    result.props.children.props.children[0].props.onClick();
    expect(dispatch).toHaveBeenCalled();
  });

  test('BankDetail', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<BankDetail />);
    expect(tree).toMatchSnapshot();

    const dispatch = jest.fn();
    const select = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);
    useRef.mockImplementationOnce(() => ({ current: { select } }));
    window.document.execCommand = jest.fn();
    const result = BankDetail();
    result.props.children[2].props.children[2].props.onClick({ target: { focus: jest.fn() } });
    expect(select).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
  });

  test('ListBank no bank', () => {
    useSelector.mockImplementationOnce(() => ({ bankInfo: '' }));

    const result = ListBank();
    expect(result).toBe(null);
  });

  test('HowToPay', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<HowToPay />);
    expect(tree).toMatchSnapshot();

    // const detailBank = jest.fn();
    const setIdxOpen = jest.fn();
    useState.mockImplementationOnce(() => [1, setIdxOpen]);
    // useSelector.mockImplementationOnce(() => ({ detailBank }));
    const result = HowToPay();
    result[0].props.children[0].props.onClick();
    result[0].props.children[0].props.children[1].props.onClick();
    // expect(setIdxOpen).toHaveBeenNthCalledWith(1, 0);
    // expect(setIdxOpen).toHaveBeenNthCalledWith(2, -1);
    // expect(result[0].props.children[0].props.children[1].props.className).toBe('open');
  });

  test('Notif', () => {
    const dispatch = jest.fn();
    const setNotif = jest.fn();
    const message = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);
    useSelector.mockImplementationOnce(fn => {
      fn({});
      return { message };
    });
    useContext.mockImplementationOnce(() => ({ setNotif }));
    Notif();
    expect(setNotif).toHaveBeenCalledWith(message);
  });

  test('Timer', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Timer />);
    expect(tree).toMatchSnapshot();

    useTimer.mockImplementationOnce(() => ({
      time: ['', '', ''],
    }));
  });
});
