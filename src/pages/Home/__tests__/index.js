import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { getToken } from '../../../utils/storage';
import Home, { Welcome, HomePage, Shop, UpgradeBanner } from '../Home';

jest.mock('../../../utils/storage');

jest.mock('../actions', () => ({
  fetchBill: jest.fn(),
  fetchHome: jest.fn(),
  fetchProfile: jest.fn(),
  fetchStatusCard: jest.fn(),
  fetchNotifCard: jest.fn(),
}));

useSelector.mockImplementation(fn => {
  fn({});
  return { isLoading: {}, fullName: 'telkom', profilePicture: 'tes.jpg' };
});

describe('src/pages/Home', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Home />);
    expect(tree).toMatchSnapshot();
  });

  test('render Shop', () => {
    useLocation.mockImplementationOnce(() => ({ pathname: '/shop' }));
    const result = Home();
    expect(result.props.children.type).toBe(Shop);
  });

  test('HomePage', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<HomePage />);
    expect(tree).toMatchSnapshot();
  });

  test('HomePage guest', () => {
    getToken.mockImplementationOnce(() => false);

    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    HomePage();

    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  test('Welcome', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Welcome />);
    expect(tree).toMatchSnapshot();

    getToken.mockImplementationOnce(() => false);
    const result = Welcome();
    expect(result.type).toBe('section');
    expect(result.props.children[0].props.children).toBe('Welcome to');
  });

  test('Shop', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Shop />);
    expect(tree).toMatchSnapshot();
  });

  test('UpgradeBanner', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UpgradeBanner />);
    expect(tree).toMatchSnapshot();
  });
});
