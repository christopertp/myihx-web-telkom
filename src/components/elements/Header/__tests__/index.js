import React, { useEffect, useState } from 'react';
import { set } from 'mockdate';
import { useLocation } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { getUserData } from '../../../../utils/storage';
import Header from '../Header';

jest.mock('../../../../utils/storage');

jest.mock('../styles.scoped.css', () => ({
  shadow: 'shadow',
}));

const body = {};
document.getElementsByTagName = (tag) => (
  tag === 'body' ? [body] : [{ scrollTop: true }]
);

describe('src/components/elements/Header', () => {
  test('render', () => {
    getUserData.mockImplementationOnce(() => '');
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Header />);
    expect(tree).toMatchSnapshot();

    useLocation.mockImplementationOnce(() => ({ pathname: '/profile' }));

    const setProfilePicture = jest.fn();
    const setDatetime = jest.fn();
    set('2011-01-01');
    useState
      .mockImplementationOnce(v => [v, jest.fn()])
      .mockImplementationOnce(v => [v, setProfilePicture])
      .mockImplementationOnce(v => [v, setDatetime]);

    Header.defaultProps.onClickLogin();
    Header(Header.defaultProps);
    expect(setProfilePicture).toHaveBeenCalledWith('tes');
    expect(setDatetime).toHaveBeenCalledWith(Date.now());
  });

  test('onscroll', () => {
    const setShadow = jest.fn();
    useState.mockImplementationOnce(v => [v, setShadow]);

    Header(Header.defaultProps);
    body.onscroll();
    expect(setShadow).toHaveBeenNthCalledWith(1, 'shadow');

    useState.mockImplementationOnce(v => [v, setShadow]);
    document.getElementsByTagName = (tag) => (
      tag === 'body' ? [body] : [{ scrollTop: false }]
    );
    Header(Header.defaultProps);
    body.onscroll();
    expect(setShadow).toHaveBeenNthCalledWith(2, '');

    useEffect.mockImplementationOnce(fn => fn()());
    Header(Header.defaultProps);
    body.onscroll();
  });

  test('Change language id & en',() => {
    const setLanguage = jest.fn();
    const setProfilePicture = jest.fn();
    const setDatetime = jest.fn();
    const setShadow = jest.fn();

    useState
      .mockImplementationOnce(v => [v, setShadow])
      .mockImplementationOnce(v => [v, setProfilePicture])
      .mockImplementationOnce(v => [v, setDatetime])
      .mockImplementationOnce(() => ['EN', setLanguage]);

    const res = Header(Header.defaultProps);
    const { children } = res.props;

    children[1].props.children[9].props.onClick();
    expect(setLanguage).toHaveBeenNthCalledWith(1,'EN');

    children[1].props.children[8].props.onClick();
    expect(setLanguage).toHaveBeenNthCalledWith(2,'ID');
  });
});
