import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import HomeRecommended from '../HomeRecommended';

jest.mock('../../../../hooks/useSlider');

jest.mock('../../../../utils/unit', () => ({
  remToPx: v => v,
}));

useSelector.mockImplementation(fn => {
  fn({});
  return { isLoading: { h: false }, latestNews: [{}], };
});

describe('src/components/fragments/HomeRecommended', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<HomeRecommended />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: { h: true } }));
    window.innerWidth = 200;
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<HomeRecommended />);
    expect(tree).toMatchSnapshot();
  });
});
