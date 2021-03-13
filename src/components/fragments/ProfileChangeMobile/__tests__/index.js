import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import ProfileChangeMobile, { New, Request, Verify } from '../ProfileChangeMobile';

useSelector.mockImplementation(fn => {
  fn({});
  return {
    fetchCheckMobile: jest.fn(),
    fetchSendOtpChangeMobile: jest.fn(),
    fetchVerifyMobile: jest.fn(),
    isLoading: { b: false },
    mobileNumber: jest.fn(),
    resetMessage: jest.fn(),
  };
});

useContext.mockImplementation(() => ({ mobile: '0812345678890', verifyType: 'SMS' }));

describe('src/components/fragments/ProfileChangeMobile', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProfileChangeMobile />);
    expect(tree).toMatchSnapshot();

    useParams.mockImplementationOnce(() => ({ subpage: 'request' }));
    const result2 = ProfileChangeMobile();
    expect(result2.props.children.type).toBe(Request);

    useParams.mockImplementationOnce(() => ({ subpage: 'verify' }));
    const result3 = ProfileChangeMobile();
    expect(result3.props.children.type).toBe(Verify);
  });

  test('New', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<New />);
    expect(tree).toMatchSnapshot();

    const setMobile = jest.fn();
    const dispatch = jest.fn();
    useContext.mockImplementationOnce(() => ({ setMobile }));
    useDispatch.mockImplementationOnce(() => dispatch );
    const result = New();
    result.props.children.props.onSubmit({ mobile: '081234567890' });
    expect(setMobile).toHaveBeenCalledWith('081234567890');
    expect(dispatch).toHaveBeenCalled();
  });

  test('Request', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Request />);
    expect(tree).toMatchSnapshot();

    const setVerifyType = jest.fn();
    const dispatch = jest.fn();
    useContext.mockImplementationOnce(() => ({ setVerifyType }));
    useDispatch.mockImplementationOnce(() => dispatch );
    const result = Request();
    result.props.children.props.onClick('SMS')();
    expect(setVerifyType).toHaveBeenCalledWith('SMS');
    result.props.children.props.onClick('Whatsapp')();
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  test('Verify', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Verify />);
    expect(tree).toMatchSnapshot();

    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch );
    useContext.mockImplementationOnce(() => ({ mobile: '0812345678890', verifyType: 'Whatsapp' }));
    const result = Verify();
    result.props.children.props.onResend();
    result.props.children.props.onSubmit({ recoveryCode: '1234' });
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
