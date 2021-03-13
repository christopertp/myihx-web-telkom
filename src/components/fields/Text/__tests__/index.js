import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Text from '../Text';

describe('src/components/fields/Text', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Text />);
    expect(tree).toMatchSnapshot();

    const result = Text({
      ...Text.defaultProps,
      input: { value: 'test' },
      inputProps: { label: 'abc' },
    });
    const label = result.props.children[0].props.children;
    expect(label).toBe('abc');
  });

  test('render error', () => {
    const meta = { error: 'error', touched: true };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Text meta={meta} />);
    expect(tree).toMatchSnapshot();
  });
});
