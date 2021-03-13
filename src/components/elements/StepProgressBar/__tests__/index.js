import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import StepProgressBar from '../StepProgressBar';

describe('src/components/elements/StepProgressBar', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepProgressBar />);
    expect(tree).toMatchSnapshot();
  });

  test('render with completed', () => {
    const result1 = StepProgressBar({  ...StepProgressBar.defaultProps, steps: 5, complete: 5 });
    expect(result1.props.children[4].props.children[0].props.className).toBe(undefined);

    const result2 = StepProgressBar({ ...StepProgressBar.defaultProps, steps:5, complete:0 });
    expect(result2.props.children[4].props.children[0].props.className).toBe('');
  });
});
