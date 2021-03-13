import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PackageFinderLink from '../PackageFinderLink';

describe('src/components/elements/PackageFinderLink', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PackageFinderLink />);
    expect(tree).toMatchSnapshot();
  });
});
