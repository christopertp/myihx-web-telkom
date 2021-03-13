import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import MainBase from '../MainBase';
import styles from '../styles.scoped.css';

const classList = { add: jest.fn(), remove: jest.fn() };
document.getElementById = () => ({ classList });

describe('src/components/layouts/MainBase', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MainBase />);
    expect(tree).toMatchSnapshot();
  });

  test('setModal', () => {
    const setModal = jest.fn();
    useEffect.mockImplementationOnce(fn => fn()());
    useState.mockImplementationOnce(v => [v, setModal]);
    useLocation.mockImplementationOnce(() => ({ pathname: '/test' }));
    const { children } = MainBase(MainBase.defaultProps).props;
    children[0].props.onClickLogin();
    expect(setModal).toHaveBeenNthCalledWith(1, true);
    children[3].props.onClickLogin();
    expect(setModal).toHaveBeenNthCalledWith(2, true);
    children[4].props.onClose();
    expect(setModal).toHaveBeenNthCalledWith(3, false);
  });

  test('setWhite', () => {
    const setWhite = jest.fn();
    useState.mockImplementationOnce(v => [v, jest.fn()]).mockImplementationOnce(v => [v, setWhite]);
    useLocation.mockImplementationOnce(() => ({ pathname: '/shop/internet/package' }));
    MainBase(MainBase.defaultProps);
    expect(setWhite).toHaveBeenCalledWith(styles.white);
  });
});
