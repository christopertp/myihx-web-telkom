import React from 'react';
import { useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import ShopMoreHboGo from '../../../components/fragments/ShopMoreHboGo';
import ShopMore from '../ShopMore';

jest.mock('../actions', () => ({
  fetchHboGo: jest.fn(),
}));

describe('src/pages/ShopMore', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ShopMore />);
    expect(tree).toMatchSnapshot();
  });

  test('render subroutes', () => {
    useParams.mockImplementationOnce(() => ({ page: 'hbo-go' }));
    const result = ShopMore();
    expect(result.props.children[1].type).toBe(ShopMoreHboGo);
  });
});
