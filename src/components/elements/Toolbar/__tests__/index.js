import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { getUserData } from '../../../../utils/storage';
import Toolbar, { Item } from '../Toolbar';

jest.mock('../../../../utils/storage');

const setActive = jest.fn();
useState.mockImplementation(v => [v, setActive]);

describe('src/components/elements/Toolbar', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Toolbar />);
    expect(tree).toMatchSnapshot();
    Toolbar.defaultProps.onClickLogin();

    // no user
    useLocation.mockImplementationOnce(() => ({ pathname: '/other' }));
    getUserData.mockImplementationOnce(() => '');
    const result = Toolbar(Toolbar.defaultProps);
    expect(result.props.style.display).toBe('none');
    expect(result.props.children[4].props.item.text).toBe('Masuk/Daftar');

    // active paths
    useLocation.mockImplementationOnce(() => ({ pathname: '/history/bill' }));
    Toolbar(Toolbar.defaultProps);
    expect(setActive).toHaveBeenCalledWith(1);

    useLocation.mockImplementationOnce(() => ({ pathname: '/shop' }));
    Toolbar(Toolbar.defaultProps);
    expect(setActive).toHaveBeenCalledWith(2);

    useLocation.mockImplementationOnce(() => ({ pathname: '/help' }));
    Toolbar(Toolbar.defaultProps);
    expect(setActive).toHaveBeenCalledWith(3);
  });

  test('Item', () => {
    const item = { icon: v => v.fill, to: '/' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Item item={item} />);
    expect(tree).toMatchSnapshot();
    Item.defaultProps.onClickLogin();

    // return null
    getUserData.mockImplementationOnce(() => '');
    const result = Item({ ...Item.defaultProps, idx: 1, item });
    expect(result).toBe(null);

    // class inactive
    const result2 = Item({ ...Item.defaultProps, idx: 2, item, user: 'tes' });
    expect(result2.props.className).toBe('');
    expect(result2.props.children[0]).toBe('#b2b4b5');
    result2.props.onClick();

    // onclicklogin
    const onClickLogin = jest.fn();
    const result3 = Item({ ...Item.defaultProps, idx: 4, item, onClickLogin });
    result3.props.onClick();
    expect(onClickLogin).toHaveBeenCalled();
  });
});
