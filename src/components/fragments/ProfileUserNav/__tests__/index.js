import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import ProfileUserNav, { TmoneyBalance, TmoneyBlocked } from '../ProfileUserNav';

useSelector.mockImplementation(fn => {
  fn({});
  return {
    isLoading: { t: false },
    fullname: '',
    profilePicture: '',
    tmoney: { extraData: { balance: 0 }, message: '', status: 'BLOCKED' },
  };
});

describe('src/components/fragments/ProfileUserNav', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProfileUserNav />);
    expect(tree).toMatchSnapshot();
  });

  test('TmoneyBalance', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TmoneyBalance />);
    expect(tree).toMatchSnapshot();
  });

  test('TmoneyBlocked', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TmoneyBlocked />);
    expect(tree).toMatchSnapshot();
  });

  test('TmoneyBalance loading', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: { t: true } }));
    const result = ProfileUserNav();
    expect(result.props.children[1].props.children[0].props.className).toBe('loading');
  });

  test('TmoneyBalance status blocked', () => {
    const setBlocked = jest.fn();
    const tmoney = { balance: 0, message: '', status: 'BLOCKED' };
    useSelector.mockImplementationOnce(() => ({ tmoney }));
    useState.mockImplementationOnce(() => [false, setBlocked]);

    const result = TmoneyBalance();
    result.props.children[0].props.onClick();
    expect(setBlocked).toHaveBeenCalledWith(true);
  });

  test('TmoneyBalance status registered', () => {
    const tmoney = { balance: 10000000, message: '', status: 'REGISTERED' };
    useSelector.mockImplementationOnce(() => ({ tmoney }));

    const result = TmoneyBalance();
    expect(result.props.children[0].props.children[1].props.children[1].props.children.join('')).toBe('Rp10.000.000');
  });

  test('TmoneyBlocked set blocked', () => {
    const setBlocked = jest.fn();
    useContext.mockImplementationOnce(() => ({ blocked: true, setBlocked }));

    const result = TmoneyBlocked();
    result.props.onClose();
    expect(setBlocked).toHaveBeenCalledTimes(1);

    result.props.children[3].props.children[0].props.onClick();
    expect(setBlocked).toHaveBeenCalledTimes(2);

    global.window = Object.create(window);
    Object.defineProperty(window, 'location', { value: { href: '' } });
    result.props.children[3].props.children[1].props.onClick();
    expect(window.location.href).toEqual('mailto:service@tmoney.co.id');
  });
});
