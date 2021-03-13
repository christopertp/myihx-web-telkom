import Context from '../';

describe('src/contexts', () => {
  test('render', () => {
    const result = Context({ children: 'children' });
    expect(result.props.children.props.children).toBe('children');
  });
});
