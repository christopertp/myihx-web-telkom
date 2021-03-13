import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Button from '../Button';

describe('src/components/elements/Button', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Button />);
    expect(tree).toMatchSnapshot();
  });

  test('render link', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Button to="/" />);
    expect(tree).toMatchSnapshot();
  });
});
