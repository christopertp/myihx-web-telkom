import React, { useEffect } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import WhiteCard from '../WhiteCard';

describe('src/components/layouts/WhiteCard', () => {
  test('render', () => {
    useEffect.mockImplementationOnce(fn => fn()());
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<WhiteCard />);
    expect(tree).toMatchSnapshot();
  });
});
