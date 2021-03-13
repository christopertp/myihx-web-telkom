import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import HomeLatest from '../HomeLatest';

jest.mock('../../../../hooks/useSlider');

jest.mock('../../../../utils/unit', () => ({
  remToPx: v => v,
}));

useSelector.mockImplementation(fn => {
  fn({});
  return { isLoading: { h: false }, latestOffers: [{}], };
});

describe('src/components/fragments/HomeLatest', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<HomeLatest />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: { h: true } }));
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<HomeLatest />);
    expect(tree).toMatchSnapshot();
  });
});
