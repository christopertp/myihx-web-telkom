import React, { useEffect } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import WhiteCardSuccess from '../WhiteCardSuccess';

describe('src/components/layouts/WhiteCardSuccess', () => {
  test('render', () => {
    useEffect.mockImplementationOnce(fn => fn()());
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<WhiteCardSuccess />);
    expect(tree).toMatchSnapshot();
  });
});
