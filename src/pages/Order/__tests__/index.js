import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Order from '../Order';

describe('src/pages/Order', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Order />);
    expect(tree).toMatchSnapshot();
  });
});
