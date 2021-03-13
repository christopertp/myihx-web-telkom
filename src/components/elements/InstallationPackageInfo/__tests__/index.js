import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import InstallationPackageInfo from '../InstallationPackageInfo';

jest.mock('../../../../utils/format', () => ({
  thousand: jest.fn(v => v),
}));

describe('src/components/elements/InstallationPackageInfo', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InstallationPackageInfo product={{ name: 'product' }} />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading', () => {
    const props = {
      ...InstallationPackageInfo.defaultProps,
      isLoading: true,
      product: { name: 'product' },
    };
    const result = InstallationPackageInfo(props);
    expect(result.props.children[1].props.children[1].props.className).toBe('loading');
  });

  test('render no product', () => {
    const product = '';
    const props = {
      ...InstallationPackageInfo.defaultProps,
      isLoading: false,
      product,
    };
    const result = InstallationPackageInfo(props);
    const header = result.props.children[0].props.children[1].props.children[0];
    expect(header.props.children[1]).toBe('No product found');
    expect(result.props.children[1].props.children[1]).toBe('');
  });
});
