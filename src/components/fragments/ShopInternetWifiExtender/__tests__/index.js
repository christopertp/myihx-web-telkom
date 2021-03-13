import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ShopInternetWifiExtender from '../ShopInternetWifiExtender';

describe('src/components/fragments/ShopInternetWifiExtender', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ShopInternetWifiExtender />);
    expect(tree).toMatchSnapshot();
  });
});
