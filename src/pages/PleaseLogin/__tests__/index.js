import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PleaseLogin from '../PleaseLogin';

describe('src/pages/PleaseLogin', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PleaseLogin />);
    expect(tree).toMatchSnapshot();
  });
});
