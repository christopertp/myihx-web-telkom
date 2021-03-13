import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import About from '../About';

describe('src/pages/About', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<About />);
    expect(tree).toMatchSnapshot();
  });
});
