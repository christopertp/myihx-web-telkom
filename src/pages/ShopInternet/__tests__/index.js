import React from 'react';
import { useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import ShopInternetWifiExtender from '../../../components/fragments/ShopInternetWifiExtender';
import { getToken } from '../../../utils/storage';
import ShopInternet, { Package, CheckAvailability } from '../ShopInternet';
import { useSelector } from 'react-redux';

jest.mock('../../../utils/storage');

jest.mock('../actions', () => ({
  fetchAddress: jest.fn(),
  fetchMostPopular: jest.fn(),
}));

const address = {
  addressDescription: 'desc',
  city: 'city',
  district: 'district',
  street: 'street',
  postalCode: 'zip',
  province: 'province',
};

useSelector.mockImplementation(f => {
  f({});
  const isLoading = { a: false };
  return { address, isLoading };
});

describe('src/pages/ShopInternet', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ShopInternet />);
    expect(tree).toMatchSnapshot();
  });

  test('render subroutes', () => {
    useParams.mockImplementationOnce(() => ({ page: 'wifi-extender' }));
    const result = ShopInternet();
    expect(result.props.children[1].type).toBe(ShopInternetWifiExtender);
  });

  test('Package', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Package />);
    expect(tree).toMatchSnapshot();
  });

  test('CheckAvailability', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CheckAvailability />);
    expect(tree).toMatchSnapshot();
  });

  test('CheckAvailability no address', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: { a: true } }));
    getToken.mockImplementationOnce(() => false);
    const result = CheckAvailability();
    const text = 'Cek Ketersediaan Indihome Di Daerah Anda';
    expect(result.props.children[0].props.children).toBe(text);
  });

  test('CheckAvailability loading', () => {
    useSelector
      .mockImplementationOnce(() => ({ address: 'address' }))
      .mockImplementationOnce(() => ({ isLoading: { a: true } }));
    const result = CheckAvailability();
    expect(result.props.children.props.className).toBe('loading');
  });
});
