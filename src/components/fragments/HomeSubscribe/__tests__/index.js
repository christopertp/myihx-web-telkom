import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import HomeSubscribe from '../HomeSubscribe';

jest.mock('../../../../hooks/useSlider');

jest.mock('../../../../utils/unit', () => ({
  remToPx: v => v,
}));

useSelector.mockImplementation(fn => {
  fn({});
  return { isLoading: { h: false }, subscriptions: { images: [{}], vodImages: [{}], } };
});

describe('src/components/fragments/HomeSubscribe', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<HomeSubscribe />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: { h: true } }));
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<HomeSubscribe />);
    expect(tree).toMatchSnapshot();
  });
});
