import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Bullet from '../Bullet';

describe('src/components/elements/Bullet', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Bullet />);
    expect(tree).toMatchSnapshot();
  });

  test('render with connect', () => {
    const result = Bullet({ ...Bullet.defaultProps, connect: true });
    expect(result.props.children[0].type).toBe('span');
  });
});
