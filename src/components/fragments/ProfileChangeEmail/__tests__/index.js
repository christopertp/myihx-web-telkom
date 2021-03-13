import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import ProfileChangeEmail, { New, Verify } from '../ProfileChangeEmail';

useSelector.mockImplementation(fn => {
  fn({});
  return {
    email: 'test@telkom.co.id',
    fetchChangeEmail: jest.fn(),
    fetchVerifyEmail: jest.fn(),
    resetMessage: jest.fn(),
  };
});

describe('src/components/fragments/ProfieChangeEmail', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProfileChangeEmail />);
    expect(tree).toMatchSnapshot();

    useParams.mockImplementationOnce(() => ({ subpage: 'verify' }));
    const result = ProfileChangeEmail();
    expect(result.props.children.type).toBe(Verify);
  });

  test('New', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<New />);
    expect(tree).toMatchSnapshot();

    const setEmailUser = jest.fn();
    const dispatch = jest.fn();
    useContext.mockImplementationOnce(() => ({ setEmailUser }));
    useDispatch.mockImplementationOnce(() => dispatch);
    const result = New();
    result.props.children.props.onSubmit({ email: 'test2@telkom.co.id' });
    expect(setEmailUser).toHaveBeenCalledWith('test2@telkom.co.id');
    expect(dispatch).toHaveBeenCalled();
  });

  test('Verify', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Verify />);
    expect(tree).toMatchSnapshot();

    const emailUser = jest.fn();
    const dispatch = jest.fn();
    useContext.mockImplementationOnce(() => ({ emailUser }));
    useDispatch.mockImplementationOnce(() => dispatch);
    const result = Verify();
    result.props.children.props.onResend();
    result.props.children.props.onSubmit({ recoveryCode: '123' });
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
