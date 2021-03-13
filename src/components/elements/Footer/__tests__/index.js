import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Footer from '../Footer';

describe('src/components/elements/Footer', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Footer />);
    expect(tree).toMatchSnapshot();
  });
});
