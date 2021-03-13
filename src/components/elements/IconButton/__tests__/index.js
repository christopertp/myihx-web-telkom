import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import IconButton from '../IconButton';

describe('src/components/elements/IconButton', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<IconButton />);
    expect(tree).toMatchSnapshot();
    IconButton.defaultProps.onClick();
  });

  test('render link', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<IconButton to="/" />);
    expect(tree).toMatchSnapshot();
  });
});
