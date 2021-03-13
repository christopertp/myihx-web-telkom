import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../components/elements/Spinner';
import Tmoney, { Activate, ChangePin, ErrorModal, History, Link, Overlay } from '../Tmoney';

const histories = [{
  timestamp: '2020-06-25 18:53:34',
  transactionName: 'Terima Transfer',
  amount: 15000,
}, {
  timestamp: '2020-06-25 16:36:03',
  transactionName: 'Isi Saldo TCASH',
  amount: -1000,
}];

useSelector.mockImplementation(fn => {
  fn({});
  return { balance: 10000000, histories, isLoading: { d: false, s: false } };
});

jest.mock('../actions', () => ({
  clearFailedDialog: jest.fn(),
  clearHistory: jest.fn(),
  fetchChangePin: jest.fn(),
  fetchLink: jest.fn(),
  fetchHistory: jest.fn(),
  fetchReset: jest.fn(),
  fetchSignup: jest.fn(),
  pinFailedAction: jest.fn(),
}));

describe('src/pages/Tmoney', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Tmoney />);
    expect(tree).toMatchSnapshot();

    useParams.mockImplementationOnce(() => ({ page: 'activate' }));
    const result = Tmoney();
    expect(result.props.children[0].type).toBe(Activate);
  });

  test('Activate', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Activate />);
    expect(tree).toMatchSnapshot();
  });

  test('ChangePin', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ChangePin />);
    expect(tree).toMatchSnapshot();
  });

  test('ErrorModal', () => {
    const failedDialog = {
      message: 'Please try again later.',
      title: 'Transaction Failed',
      to: '/profile',
    };
    useSelector.mockImplementationOnce(fn => {
      fn({});
      return { failedDialog };
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ErrorModal />);
    expect(tree).toMatchSnapshot();
  });

  test('History', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<History />);
    expect(tree).toMatchSnapshot();
  });

  test('Overlay', () => {
    useContext.mockImplementationOnce(() => ({ setOverlay: jest.fn() }));
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Overlay />);
    expect(tree).toMatchSnapshot();
  });

  test('render change pin', () => {
    useParams.mockImplementationOnce(() => ({ page: 'change-pin' }));
    const result = Tmoney();
    expect(result.props.children[0].type).toBe(ChangePin);
  });

  test('render link', () => {
    useParams.mockImplementationOnce(() => ({ page: 'link' }));
    const result = Tmoney();
    expect(result.props.children[0].type).toBe(Link);
  });

  test('Activate account', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    const result = Activate();
    result.props.children.props.onSubmit({ password: '' });
    expect(dispatch).toHaveBeenCalled();
  });

  test('ChangePin loading', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: { s: true } }));

    const result = ChangePin();
    expect(result.props.children.props.children[1].props.children.type).toBe(Spinner);
  });

  test('ChangePin reset pin', () => {
    const setReset = jest.fn();
    useContext.mockImplementationOnce(() => ({ setReset }));

    const result = ChangePin();
    result.props.children.props.children[1].props.onClick();
    expect(setReset).toHaveBeenCalledWith(true);
  });

  test('ChangePin steps', () => {
    const dispatch = jest.fn();
    const setAttempt = jest.fn();
    const setNewPin = jest.fn();
    const setPin = jest.fn();
    const setStep = jest.fn();

    useDispatch.mockImplementationOnce(() => dispatch);
    useState.mockImplementationOnce(() => [3, setAttempt])
      .mockImplementationOnce(() => ['', setNewPin])
      .mockImplementationOnce(() => ['', setPin])
      .mockImplementationOnce(() => [0, setStep]);

    const result = ChangePin();
    result.props.children.props.children[0].props.onSubmit('123');
    expect(setPin).toHaveBeenCalledWith('123');
    expect(setStep).toHaveBeenCalledWith(1);
    expect(dispatch).toHaveBeenCalled();

    useDispatch.mockImplementationOnce(() => dispatch);
    useState.mockImplementationOnce(() => [3, setAttempt])
      .mockImplementationOnce(() => ['', setNewPin])
      .mockImplementationOnce(() => ['', setPin])
      .mockImplementationOnce(() => [1, setStep]);

    const result2 = ChangePin();
    result2.props.children.props.children[0].props.onSubmit('456');
    expect(setNewPin).toHaveBeenCalledWith('456');
    expect(setStep).toHaveBeenCalledWith(2);
    expect(dispatch).toHaveBeenCalled();

    useDispatch.mockImplementationOnce(() => dispatch);
    useState.mockImplementationOnce(() => [3, setAttempt])
      .mockImplementationOnce(() => ['123', setNewPin])
      .mockImplementationOnce(() => ['', setPin])
      .mockImplementationOnce(() => [2, setStep]);

    const result3 = ChangePin();
    result3.props.children.props.children[0].props.onSubmit('123');
    expect(dispatch).toHaveBeenCalled();
  });

  test('ChangePin wrong pin', () => {
    const dispatch = jest.fn();
    const setAttempt = jest.fn();
    const setNewPin = jest.fn();
    const setPin = jest.fn();
    const setStep = jest.fn();

    useDispatch.mockImplementationOnce(() => dispatch);
    useState.mockImplementationOnce(() => [3, setAttempt])
      .mockImplementationOnce(() => ['123', setNewPin])
      .mockImplementationOnce(() => ['', setPin])
      .mockImplementationOnce(() => [2, setStep]);

    const result = ChangePin();
    result.props.children.props.children[0].props.onSubmit('456');
    expect(setStep).toHaveBeenCalledWith(1);
    expect(dispatch).toHaveBeenCalled();

    const stores = { isLoading: { d: false, s: false }, pinMessage: 'Wrong PIN' };
    useSelector.mockImplementationOnce(() => ({ ...stores }));

    useState.mockImplementationOnce(() => [2, setAttempt])
      .mockImplementationOnce(() => ['123', setNewPin])
      .mockImplementationOnce(() => ['', setPin])
      .mockImplementationOnce(() => [2, setStep]);

    const result2 = ChangePin();
    const { error } = result2.props.children.props.children[0].props;
    expect(error).toBe('Wrong PIN! You have 2 attempt(s) left');
  });

  test('ErrorModal back', () => {
    const dispatch = jest.fn();
    const push = jest.fn();
    const failedDialog = {
      message: 'Please try again later.',
      title: 'Transaction Failed',
      to: '/profile',
      notif: {},
    };

    useDispatch.mockImplementationOnce(() => dispatch);
    useHistory.mockImplementationOnce(() => ({ push }));
    useSelector.mockImplementationOnce(() => ({ failedDialog }));

    const result = ErrorModal();
    result.props.onClose();
    expect(dispatch).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith(failedDialog.to, failedDialog.notif);
  });
});
