import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../components/elements/Spinner';
import { Home, Link, NoHistory, Reset } from '../Tmoney';

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

describe('src/pages/Tmoney-2', () => {
  test('Home', () => {
    window.IntersectionObserver = jest.fn().mockImplementationOnce(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
    }));

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Home />);
    expect(tree).toMatchSnapshot();
  });

  test('Link', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Link />);
    expect(tree).toMatchSnapshot();
  });

  test('NoHistory', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<NoHistory />);
    expect(tree).toMatchSnapshot();
  });

  test('Reset', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Reset />);
    expect(tree).toMatchSnapshot();
  });

  test('Home buttons click', () => {
    const observe = jest.fn();
    const push = jest.fn();
    const setReset = jest.fn();
    const unobserve = jest.fn();

    useContext.mockImplementationOnce(() => ({ setReset }));
    useHistory.mockImplementationOnce(() => ({ push }));
    window.IntersectionObserver.mockImplementationOnce(() => ({ observe, unobserve }));

    const result = Home();
    const { children } = result.props.children.props;
    children[2].props.children[0].props.onClick();
    expect(setReset).toHaveBeenCalledWith(true);

    children[2].props.children[2].props.onClick();
    expect(push).toHaveBeenCalledWith('/tmoney/change-pin');

    children[2].props.children[4].props.onClick();
    expect(push).toHaveBeenCalledWith('/linkaja');
  });

  test('Home loading', () => {
    const isLoading = { d: true, s: false };
    const observe = jest.fn();
    const unobserve = jest.fn();

    useCallback.mockImplementationOnce(fn => fn, []);
    useEffect.mockImplementationOnce(fn => fn()())
      .mockImplementationOnce(fn => fn()());
    useSelector.mockImplementationOnce(() => ({ histories: [], isLoading }));
    window.IntersectionObserver.mockImplementationOnce(() => ({ observe, unobserve }));

    const result = Home();
    const { children } = result.props.children.props;
    expect(children[1].props.className).toBe('loading');
    expect(children[5].props.children[0].props.className).toBe('loading');
  });

  test('Home scroll', () => {
    const dispatch = jest.fn();
    const entry = { boundingClientRect: { y: 10 } };
    const observe = jest.fn();
    const unobserve = jest.fn();

    useDispatch.mockImplementationOnce(() => dispatch);
    useRef.mockImplementationOnce(() => ({ current: 100 }));
    window.IntersectionObserver.mockImplementationOnce(fn => {
      fn([entry]);
      return { observe, unobserve };
    });

    Home();
    expect(dispatch).toHaveBeenCalledTimes(2);

    useDispatch.mockImplementationOnce(() => dispatch);
    useRef.mockImplementationOnce(() => ({ current: 0 }));
    window.IntersectionObserver.mockImplementationOnce(fn => {
      fn([entry]);
      return { observe, unobserve };
    });

    Home();
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  test('Link loading', () => {
    const isLoading = { s: true };
    useSelector.mockImplementationOnce(() => ({ isLoading }));

    const result = Link();
    expect(result.props.children.props.children[1].props.children.type).toBe(Spinner);
  });

  test('Link reset pin', () => {
    const setReset = jest.fn();
    useContext.mockImplementationOnce(() => ({ setReset }));

    const result = Link();
    result.props.children.props.children[1].props.onClick();
    expect(setReset).toHaveBeenCalledWith(true);
  });

  test('Link submit', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    const result = Link();
    result.props.children.props.children[0].props.onSubmit();
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  test('NoHistory loading', () => {
    const isLoading = { d: true };
    useSelector.mockImplementationOnce(() => ({ isLoading }));

    const result = NoHistory();
    expect(result).toBe(null);
  });

  test('Reset finished', () => {
    const setReset = jest.fn();

    useContext.mockImplementationOnce(() => ({ setReset }));
    useSelector.mockImplementationOnce(() => ({ isLoading: { s: false }, resetFinished: true }));

    Reset();
    expect(setReset).toHaveBeenCalled();
  });

  test('Reset loading', () => {
    const setReset = jest.fn();

    useContext.mockImplementationOnce(() => ({ reset: true, setReset }));
    useSelector.mockImplementationOnce(() => ({ isLoading: { s: true } }));

    const result = Reset();
    expect(result.props.children[2].props.children[1].props.children.type).toBe(Spinner);
  });

  test('Reset on close', () => {
    const setReset = jest.fn();

    useContext.mockImplementationOnce(() => ({ reset: true, setReset }));

    const result = Reset();
    result.props.children[2].props.children[0].props.onClick();
    expect(setReset).toHaveBeenCalledWith(false);

    result.props.onClose();
    expect(setReset).toHaveBeenCalledWith(false);
    expect(setReset).toHaveBeenCalledTimes(2);
  });

  test('Reset on reset', () => {
    const dispatch = jest.fn();
    const setReset = jest.fn();

    useContext.mockImplementationOnce(() => ({ setReset }));
    useDispatch.mockImplementationOnce(() => dispatch);

    const result = Reset();
    result.props.children[2].props.children[1].props.onClick();
    expect(dispatch).toHaveBeenCalled();
  });
});
