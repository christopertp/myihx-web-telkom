import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import ForgotPassword, { User, RecoveryCode, New } from '../ForgotPassword';

jest.mock('../actions', () => ({
  fetchForgotPassword: jest.fn(),
  fetchResetPassword: jest.fn(),
  fetchVerify: jest.fn(),
}));

useSelector.mockImplementation(fn => {
  fn({});
  return { userId: 'id' };
});

describe('src/pages/ForgotPassword', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ForgotPassword />);
    expect(tree).toMatchSnapshot();

    useParams.mockImplementationOnce(() => ({ page: 'recovery-code' }));
    const result1 = ForgotPassword();
    expect(result1.props.children.type).toBe(RecoveryCode);

    useParams.mockImplementationOnce(() => ({ page: 'new' }));
    const result2 = ForgotPassword();
    expect(result2.props.children.type).toBe(New);
  });

  test('User', () => {
    const dispatch = jest.fn();
    const setUser = jest.fn();
    useContext.mockImplementationOnce(() => ({ setUser }));
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<User />);
    expect(tree).toMatchSnapshot();

    useContext.mockImplementationOnce(() => ({ setUser }));
    useDispatch.mockImplementationOnce(() => dispatch);
    const result = User();
    result.props.children.props.onSubmit({ user: 'tes' });
    expect(dispatch).toHaveBeenCalled();
    expect(setUser).toHaveBeenCalledWith('tes');
  });

  test('RecoveryCode', () => {
    const dispatch = jest.fn();
    useContext.mockImplementationOnce(() => ({ user: '0812345678' }));
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RecoveryCode />);
    expect(tree).toMatchSnapshot();

    useContext.mockImplementationOnce(() => ({ user: 'tes@telkom.co.id' }));
    useDispatch.mockImplementationOnce(() => dispatch);
    useSelector.mockImplementationOnce(() => ({ userId: 'id' }));
    const result = RecoveryCode();
    result.props.children.props.onSubmit({ RecoveryCode: '123' });
    expect(dispatch).toHaveBeenCalled();
  });

  test('New', () => {
    const dispatch = jest.fn();
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<New />);
    expect(tree).toMatchSnapshot();

    useDispatch.mockImplementationOnce(() => dispatch);
    const result = New();
    result.props.children.props.onSubmit({ password: 't3lkom' });
    expect(dispatch).toHaveBeenCalled();
  });
});
