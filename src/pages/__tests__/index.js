import pages from '../';

describe('src/pages', () => {
  test('render', () => {
    const result = pages.Error404({ children: 'tes' });
    expect(result.props.children.props.children).toBe('tes');
  });
});
