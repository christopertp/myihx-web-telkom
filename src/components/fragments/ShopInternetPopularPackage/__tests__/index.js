import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import ShopInternetPopularPackage, { Articles, DesktopList, Headers, MobileList } from '../ShopInternetPopularPackage';

useSelector.mockImplementation(fn => {
  fn({});
  return {
    isLoading: { p: false },
    packages: [{ productInfo: [{}], }],
  };
});

describe('src/components/fragments/ShopInternetPopularPackage', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ShopInternetPopularPackage />);
    expect(tree).toMatchSnapshot();
  });

  test('render mobile', () => {
    window.innerWidth = 360;
    const result = ShopInternetPopularPackage();
    expect(result.props.children[1].type).toBe(MobileList);
  });

  test('MobileList', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MobileList />);
    expect(tree).toMatchSnapshot();
  });

  test('MobileList loading', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: { p: true } }));
    const result = MobileList();
    expect(result.props.children.length).toBe(3);
    expect(result.props.children[0].props.children).toBe(undefined);
  });

  test('MobileList special deal & discount', () => {
    const packages = [{
      discount: true,
      price: 2500,
      priceDiscount: 1000,
      productBestDeals: true,
      productInfo: [{}],
    }];
    useSelector.mockImplementationOnce(() => ({ isLoading: {}, packages }));
    const result = MobileList();
    const footer = result.props.children[0].props.children[1];
    expect(footer.props.children[0].props.children).toBe('Special Deal!');
    expect(footer.props.children[1].props.children[1]).toBe('1.000');
    expect(footer.props.children[2].props.children).toBe('Rp2.500');
  });

  test('DesktopList', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DesktopList />);
    expect(tree).toMatchSnapshot();
  });

  test('DesktopList loading', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: { p: true } }));
    const result = DesktopList();
    expect(result.props.children.length).toBe(3);
    expect(result.props.children[0].props.children).toBe(undefined);
  });

  test('Headers', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Headers data={[{}]} />);
    expect(tree).toMatchSnapshot();
  });

  test('Articles', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Articles data={{}} specialBonus={{}} />);
    expect(tree).toMatchSnapshot();
  });

  test('Articles best deal & discount', () => {
    const data = {
      price: 2500,
      productBestDeals: true,
      productInfo: [{}],
    };
    const result = Articles({ data, specialBonus: {} });
    expect(result.props.children[1].props.children).toBe('Best Deal!');
    expect(result.props.children[2].props.children[1]).toBe('2.500');
  });

  test('Articles discount price', () => {
    const data = {
      discount: true,
      price: 2500,
      priceDiscount: 1000,
      productInfo: [{}],
    };
    const result = Articles({ data, specialBonus: {} });
    expect(result.props.children[2].props.children[1]).toBe('1.000');
    expect(result.props.children[3].props.children).toBe('Rp2.500');
  });
});
