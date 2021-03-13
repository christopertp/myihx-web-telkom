import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CircularProgress from '../CircularProgress';

describe('src/components/elements/CircularProgress', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CircularProgress />);
    expect(tree).toMatchSnapshot();
  });

  test('render with completed', () => {
    const result1 = CircularProgress({  ...CircularProgress.defaultProps, circleOneStroke: '#f2f2f2', circleTwoStroke: '#ee3124', icon: 'wifi', progress: 100, size: 130, strokeWidth: 7, });
    expect(result1.props.children[1].props.children[1].props.strokeDashoffset).toBe(0);

    const result2 = CircularProgress({  ...CircularProgress.defaultProps, circleOneStroke: '#f2f2f2', circleTwoStroke: '#ee3124', icon: 'warning', progress: 0, size: 130, strokeWidth: 7, });
    expect(result2.props.children[1].props.children[1].props.strokeDashoffset).not.toBe(0);
  });
});
