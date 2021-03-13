import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import HomeShopMenu from '../HomeShopMenu';

describe('src/components/fragments/HomeShopMenu', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<HomeShopMenu />);
    expect(tree).toMatchSnapshot();
  });
});
