import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import useTimer from '../../../hooks/useTimer';
import Register, { User, Request, Verify, IndihomeNumber, Success } from '../Register';

jest.mock('../../../hooks/useTimer', () => jest.fn(() => ({
  setTimer: jest.fn(),
  timer: 100,
  time: ['', '', ''],
})));

jest.mock('../actions', () => ({
  fetchIndihomeNumber: jest.fn(),
  fetchRegisterUser: jest.fn(),
  fetchSendOtpRegister: jest.fn(),
  fetchVerifyRegister: jest.fn(),
  resetMessage: jest.fn(),
  setVerifiedAccount: jest.fn(),
}));

useSelector.mockImplementation(fn => {
  fn({});
  return {};
});

describe('src/pages/Register', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Register />);
    expect(tree).toMatchSnapshot();

    useParams.mockImplementationOnce(() => ({ page: 'request' }));
    const result1 = Register();
    expect(result1.props.children.type).toBe(Request);

    useParams.mockImplementationOnce(() => ({ page: 'verify' }));
    const result2 = Register();
    expect(result2.props.children.type).toBe(Verify);

    useParams.mockImplementationOnce(() => ({ page: 'indihome-number' }));
    const result3 = Register();
    expect(result3.props.children.type).toBe(IndihomeNumber);

    useParams.mockImplementationOnce(() => ({ page: 'success' }));
    const result4 = Register();
    expect(result4.props.children.type).toBe(Success);
  });

  test('User', () => {
    const dispatch = jest.fn();
    const setMobileNumber = jest.fn();
    useContext.mockImplementationOnce(() => ({ setMobileNumber }));
    useDispatch.mockImplementationOnce(() => dispatch);
    useSelector.mockImplementationOnce(fn => {
      fn({});
      return { message: '404' };
    });
    const result = User();
    result.props.children[0].props.onSubmit({ mobileNumber: 'test' });
    result.props.children[1].props.onClose();
    result.props.children[1].props.children[2].props.children[0].props.onClick();
    expect(dispatch).toHaveBeenCalled();
    expect(setMobileNumber).toHaveBeenCalledWith('test');
  });

  test('Request', () => {
    const dispatch = jest.fn();
    const setVerifyType = jest.fn();
    useContext.mockImplementationOnce(() => ({ setVerifyType, mobileNumber: '' }));
    useSelector.mockImplementationOnce(fn => {
      fn({});
      return { isLoading: false, message: '', userId: 'id' };
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Request />);
    expect(tree).toMatchSnapshot();

    useContext.mockImplementationOnce(() => ({ setVerifyType, mobileNumber: '' }));
    useDispatch.mockImplementationOnce(() => dispatch);
    useSelector.mockImplementationOnce(() => ({ setVerifyType, mobileNumber: '' }));
    const result = Request();
    result.props.children.props.onClick('Whatsapp')();
    expect(dispatch).toHaveBeenCalled();
    expect(setVerifyType).toHaveBeenCalledWith('Whatsapp');

    result.props.children.props.onClick('SMS')();
    expect(setVerifyType).toHaveBeenCalledWith('SMS');
  });

  test('Verify', () => {
    useContext.mockImplementationOnce(() => ({ mobileNumber: '', verifyType: '' }));
    useSelector.mockImplementationOnce(fn => {
      fn({});
      return { isLoading: false, message: '', userId: 'id' };
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Verify />);
    expect(tree).toMatchSnapshot();

    const setTimer = jest.fn();
    const dispatch = jest.fn();
    useContext.mockImplementationOnce(() => ({ mobileNumber: '', verifyType: '' }));
    useDispatch.mockImplementationOnce(() => dispatch);
    useSelector.mockImplementationOnce(() => ({ isLoading: false, message: '', userId: 'id' }));
    useTimer.mockImplementationOnce(() => ({
      setTimer,
      timer: 0,
      time: ['', '', ''],
    }));
    const result = Verify();
    result.props.children[0].props.onSubmit();
    expect(dispatch).toHaveBeenCalled();
    result.props.children[1].props.onClick();
    expect(setTimer).toHaveBeenCalled();
  });

  test('IndihomeNumber', () => {
    const dispatch = jest.fn();
    const setChoose = jest.fn();
    const setError = jest.fn();
    const setNumber = jest.fn();
    useSelector.mockImplementationOnce(fn => {
      fn({});
      return { isLoading: false, profilePicture: '', userId: '' };
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<IndihomeNumber />);
    expect(tree).toMatchSnapshot();

    useDispatch.mockImplementationOnce(() => dispatch);
    useSelector.mockImplementationOnce(() => ({ isLoading: false, profilePicture: 'test.png', userId: 'test' }));
    useState.mockImplementationOnce(() => ['yes', setChoose])
      .mockImplementationOnce(() => ['', setError])
      .mockImplementationOnce(() => ['', setNumber]);
    const result = IndihomeNumber();
    result.props.children[0]
      .props.children[1]
      .props.children[1]
      .props.onChange({ target: { value: 123 } });
    expect(setError).toHaveBeenCalled();
    expect(setNumber).toHaveBeenCalled();
    result.props.children[0]
      .props.children[1]
      .props.children[1]
      .props.onChange({ target: { value: 'abc' } });
    expect(setError).toHaveBeenCalled();
    result.props.children[0].props.onClick();
    expect(setChoose).toHaveBeenCalledWith('yes');
    result.props.children[1].props.onClick();
    expect(setChoose).toHaveBeenCalledWith('no');
    result.props.children[2].props.onClick();
    expect(dispatch).toHaveBeenCalled();
    useState.mockImplementationOnce(() => ['no', setChoose])
      .mockImplementationOnce(() => ['', setError])
      .mockImplementationOnce(() => ['', setNumber]);
    const push = jest.fn();
    useSelector.mockImplementationOnce(() => ({ isLoading: false, profilePicture: 'test.png', userId: 'test' }));
    useHistory.mockImplementationOnce(() => ({ push }));
    const result2 = IndihomeNumber();
    result2.props.children[2].props.onClick();
    expect(push).toHaveBeenCalledWith('/register/success');
  });

  test('IndihomeNumber error state', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    useSelector.mockImplementationOnce(() => ({ message: 'error' }));

    const result = IndihomeNumber();
    const fieldError = result.props.children[0].props.children[1];
    expect(fieldError.props.children[2].props.children).toBe('error');

    fieldError.props.children[1].props.onChange({ target: { value: '' } });
    expect(dispatch).toHaveBeenCalled();
  });

  test('Success', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Success />);
    expect(tree).toMatchSnapshot();
  });

  test('Success onClick', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);
    const result = Success();
    result.props.children.props.onClick();
    expect(dispatch).toHaveBeenCalled();
  });
});
