import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import PackageDetailMenu from '../PackageDetailMenu';

useSelector.mockImplementation(fn => {
  fn({});
  return {
    data: {
      productInfo: [{ name: 'nama', description: 'desc' }],
    },
    isLoading: { data: false, submit: false },
  };
});

describe('src/components/fragments/PackageDetailMenu', () => {
  test('render', () => {
    PackageDetailMenu.defaultProps.onClickDetail();
    PackageDetailMenu.defaultProps.onClickSubscribe();
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PackageDetailMenu />);
    expect(tree).toMatchSnapshot();
  });

  test('loading state', () => {
    const isLoading = { data: true, submit: true };
    useSelector.mockImplementationOnce(() => ({ data: {}, isLoading }));
    const result = PackageDetailMenu(PackageDetailMenu.defaultProps);
    const ul = result.props.children[1];
    expect(ul.props.children.length).toBe(2);
    expect(ul.props.children[0].props.children).toBe(undefined);
    const aside = result.props.children[0].props.children[1].props.children[3];
    expect(aside.props.children[2].props.children.type).toBe(Spinner);
  });
});
