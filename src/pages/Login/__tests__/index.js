import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import useTimer from '../../../hooks/useTimer';
import Login, { User, Password, Request, Verify } from '../Login';

jest.mock('../../../hooks/useTimer', () => jest.fn(() => ({
  setTimer: jest.fn(),
  timer: 100,
  time: ['', '', ''],
})));

jest.mock('../actions', () => ({
  fetchCheckUser: jest.fn(),
  fetchLoginUser: jest.fn(),
  fetchSendOtp: jest.fn(),
  fetchVerifyLogin: jest.fn(),
  resetMessage: jest.fn(),
}));

describe('src/pages/Login', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Login />);
    expect(tree).toMatchSnapshot();

    useParams.mockImplementationOnce(() => ({ page: 'password' }));
    const result1 = Login();
    expect(result1.props.children.type).toBe(Password);

    useParams.mockImplementationOnce(() => ({ page: 'request' }));
    const result2 = Login();
    expect(result2.props.children.type).toBe(Request);

    useParams.mockImplementationOnce(() => ({ page: 'verify' }));
    const result3 = Login();
    expect(result3.props.children.type).toBe(Verify);
  });

  test('User', () => {
    const dispatch = jest.fn();
    const setUser = jest.fn();
    useContext.mockImplementationOnce(() => ({ setUser }));
    useSelector.mockImplementationOnce(fn => {
      fn({});
      return { message: '' };
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<User />);
    expect(tree).toMatchSnapshot();

    useContext.mockImplementationOnce(() => ({ setUser }));
    useDispatch.mockImplementationOnce(() => dispatch);
    useSelector.mockImplementationOnce(() => ({ message: '404' }));
    const result = User();
    result.props.children[0].props.onSubmit({ user: 'tes' });
    result.props.children[1].props.onClose();
    result.props.children[1].props.children[2].props.children[0].props.onClick();
    expect(dispatch).toHaveBeenCalled();
    expect(setUser).toHaveBeenCalledWith('tes');
  });

  test('Password', () => {
    const dispatch = jest.fn();
    useContext.mockImplementationOnce(() => ({ user: '' }));
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Password />);
    expect(tree).toMatchSnapshot();

    useContext.mockImplementationOnce(() => ({ user: 'tes' }));
    useDispatch.mockImplementationOnce(() => dispatch);
    const result = Password();
    result.props.children.props.onSubmit({ password: '123' });
    expect(dispatch).toHaveBeenCalled();
  });

  test('Request', () => {
    const dispatch = jest.fn();
    const setVerifyType = jest.fn();
    useContext.mockImplementationOnce(() => ({ setVerifyType, user: '' }));
    useSelector.mockImplementationOnce(fn => {
      fn({});
      return { isLoading: false, message: '' };
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Request />);
    expect(tree).toMatchSnapshot();

    useContext.mockImplementationOnce(() => ({ setVerifyType, user: '', verifyType: 'SMS' }));
    useDispatch.mockImplementationOnce(() => dispatch);
    useSelector.mockImplementationOnce(() => ({ isLoading: true, message: 'error' }));
    const result = Request();
    result.props.children.props.onClick('SMS')();
    expect(setVerifyType).toHaveBeenCalledWith('SMS');
    result.props.children.props.onClick('WA')();
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  test('Verify', () => {
    useContext.mockImplementationOnce(() => ({ user: '', verifyType: '' }));
    useSelector.mockImplementationOnce(fn => {
      fn({});
      return { isLoading: false, message: '', userId: 'id' };
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Verify />);
    expect(tree).toMatchSnapshot();

    const dispatch = jest.fn();
    const setTimer = jest.fn();
    useContext.mockImplementationOnce(() => ({ user: '', verifyType: '' }));
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
});
