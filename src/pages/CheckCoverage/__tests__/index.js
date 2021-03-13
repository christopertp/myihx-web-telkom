import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { getToken } from '../../../utils/storage';
import CheckCoverage, { MapSelect, Address, PT1, PT3, ModalPT2 } from '../CheckCoverage';

jest.mock('../actions', () => ({
  fetchAvailability: jest.fn(),
  fetchSubscribe: jest.fn(),
  resetMessage: jest.fn(),
}));

jest.mock('../../../hooks/useGMap', () => () => ({
  refInput: 'input',
  refMap: 'map',
}));

jest.mock('../../../utils/storage');

useSelector.mockImplementation(fn => {
  fn({});
  return {};
});

const app = {
  style: { overflowY: 'overflow' },
};
document.getElementById = () => (app);

describe('src/pages/CheckCoverage', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CheckCoverage />);
    expect(tree).toMatchSnapshot();
  });

  test('render subpage', () => {
    const replace = jest.fn();
    const setModalLogin = jest.fn();
    useHistory.mockImplementationOnce(() => ({ replace }));
    useParams.mockImplementationOnce(() => ({ page: 'address' }));
    useState.mockImplementationOnce(v => [v, setModalLogin]);
    const result1 = CheckCoverage();
    result1.props.children[2].props.onClose();
    expect(result1.props.children[0].type).toBe(Address);
    expect(replace).toHaveBeenCalledWith('/check-coverage');
    expect(setModalLogin).toHaveBeenCalledWith(false);

    useParams.mockImplementationOnce(() => ({ page: 'pt1' }));
    const result2 = CheckCoverage();
    expect(result2.props.children[0].type).toBe(PT1);

    useParams.mockImplementationOnce(() => ({ page: 'pt3' }));
    useEffect.mockImplementationOnce(f => f()());

    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    const result3 = CheckCoverage();
    expect(result3.props.children[0].type).toBe(PT3);
    expect(dispatch).toHaveBeenCalled();
  });

  test('MapSelect', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MapSelect />);
    expect(tree).toMatchSnapshot();
  });

  test('MapSelect input events', () => {
    useContext.mockImplementationOnce(() => ({ address: 'test' }));
    useEffect.mockImplementationOnce(fn => fn()());
    const result = MapSelect();
    const input = result.props.children[2].props.children[0];
    expect(app.style.overflowY).toBe('');
    input.props.onFocus();
    expect(app.style.overflowY).toBe('hidden');
    input.props.onBlur();
    expect(app.style.overflowY).toBe('');
    expect(result.props.children[2].props.children[1].props.children).toBe('test');
  });

  test('Address', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Address />);
    expect(tree).toMatchSnapshot();
  });

  test('Address onSubmit', () => {
    const coord = { lat: 1, lng: 2 };
    const dispatch = jest.fn();
    useContext.mockImplementationOnce(() => ({ coord }));
    useDispatch.mockImplementationOnce(() => dispatch);
    const result = Address();
    result.props.children.props.onSubmit('payload');
    expect(dispatch).toHaveBeenCalled();
  });

  test('PT1', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PT1 />);
    expect(tree).toMatchSnapshot();
  });

  test('PT1 onClick as guest, onClickSubscribe', () => {
    const setModalLogin = jest.fn();
    useContext.mockImplementationOnce(() => ({ setModalLogin }));
    getToken.mockImplementationOnce(() => false);
    const result = PT1();
    result.props.children.props.children[0].props.onClick();
    expect(setModalLogin).toHaveBeenCalledWith(true);

    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    const resul2 = PT1();
    resul2.props.children.props.children[0].props.onClick();
    expect(dispatch).toHaveBeenCalled();

  });

  test('PT3', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PT3 />);
    expect(tree).toMatchSnapshot();
  });

  test('PT3 as guest', () => {
    getToken.mockImplementationOnce(() => false);
    const result = PT3();
    expect(result.props.subtitle).toBe('Login or register to stay updated!');
    expect(result.props.children.props.children.length).toBe(3);
  });

  test('ModalPT2', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalPT2 />);
    expect(tree).toMatchSnapshot();
  });

  test('ModalPT2 events & as guest', () => {
    const setModalLogin = jest.fn();
    const dispatch = jest.fn();
    const resetMessage = jest.fn();
    useContext.mockImplementationOnce(() => ({ setModalLogin }));
    useDispatch.mockImplementationOnce(() => dispatch);
    useSelector.mockImplementationOnce(() => ({ resetMessage }));
    getToken.mockImplementationOnce(() => false);
    const result = ModalPT2();
    result.props.onClose();
    expect(resetMessage).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
    result.props.children[2].props.children[1].props.onClick();
    expect(setModalLogin).toHaveBeenCalledWith(true);
  });
});
