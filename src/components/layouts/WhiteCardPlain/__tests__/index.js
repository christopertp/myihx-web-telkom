import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import WhiteCardPlain from '../WhiteCardPlain';

describe('src/components/layouts/WhiteCardPlain', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<WhiteCardPlain />);
    expect(tree).toMatchSnapshot();
  });

  test('render with complete props', () => {
    const shallow = new ShallowRenderer();
    const newProps = { back: '/', help: true, icon: 'test', subtitle: 'subs' };
    const props = { ...WhiteCardPlain.defaultProps, ...newProps };
    const tree = shallow.render(<WhiteCardPlain {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
