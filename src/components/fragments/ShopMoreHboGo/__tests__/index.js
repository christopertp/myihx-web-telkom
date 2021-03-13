import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import ShopMoreHboGo, { OriginalSeries, DramaSeries, ActionSeries, HowToUse } from '../ShopMoreHboGo';

jest.mock('../../../../hooks/useSlider');

jest.mock('../../../../utils/unit', () => ({
  remToPx: v => v,
}));

useSelector.mockImplementation(fn => {
  fn({});
  return { isLoading: false,
    logoImage: '',
    hboShows: [],
    aboutTheServices: '',
    benefits: [],
    popularDrama: [],
    thrillingAction: [],
    howToUse: []
  };
});

describe('src/components/fragments/ShopMoreHboGo', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ShopMoreHboGo />);
    expect(tree).toMatchSnapshot();
  });

  test('OriginalSeries', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<OriginalSeries />);
    expect(tree).toMatchSnapshot();
  });

  test('DramaSeries', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DramaSeries />);
    expect(tree).toMatchSnapshot();
  });

  test('ActionSeries', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ActionSeries />);
    expect(tree).toMatchSnapshot();
  });

  test('HowToUse', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<HowToUse />);
    expect(tree).toMatchSnapshot();
  });
});
