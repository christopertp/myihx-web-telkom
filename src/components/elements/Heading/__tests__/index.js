import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Heading from '../Heading';

describe('src/components/elements/Heading', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Heading>Text</Heading>);
    expect(tree).toMatchSnapshot();
  });
});
