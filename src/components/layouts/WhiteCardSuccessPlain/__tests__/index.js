import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import WhiteCardSuccessPlain from '../WhiteCardSuccessPlain';

describe('src/components/layouts/WhiteCardSuccessPlain', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<WhiteCardSuccessPlain />);
    expect(tree).toMatchSnapshot();
  });
});
