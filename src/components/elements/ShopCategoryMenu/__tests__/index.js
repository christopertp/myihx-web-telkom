import React from 'react';
import { useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import ShopCategoryMenu from '../ShopCategoryMenu';

jest.mock('../styles.scoped.css', () => ({
  active: 'active',
}));

const links = [
  { page: 'internet', to: '/internet', text: 'Internet' },
  { page: '', to: '/', text: '' },
];

describe('src/components/elements/ShopCategoryMenu', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ShopCategoryMenu links={links} />);
    expect(tree).toMatchSnapshot();
  });

  test('render styled links', () => {
    useParams.mockImplementationOnce(() => ({ page: 'internet' }));
    const { defaultProps } = ShopCategoryMenu;
    const result = ShopCategoryMenu({ ...defaultProps, links });
    expect(result.props.children[1].props.children[0].props.className).toBe('active');
  });
});
