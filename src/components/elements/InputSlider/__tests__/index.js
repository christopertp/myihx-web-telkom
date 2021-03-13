import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import InputSlider from '../InputSlider';

describe('src/components/elements/InputSlider', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InputSlider />);
    expect(tree).toMatchSnapshot();
  });

  test('render show tooltip', () => {
    const props = { ...InputSlider.defaultProps, showTooltip: false };
    const result = InputSlider(props);
    expect(result.props.children[0].props.style.display).toBe('none');
  });
});
