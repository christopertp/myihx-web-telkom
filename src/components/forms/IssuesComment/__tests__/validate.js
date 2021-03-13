import validate from '../validate';

describe('src/components/forms/IssuesComment/validate', () => {
  test('validated', () => {
    const { message } = validate({ message: 'check' });
    expect(message).toBe('');
  });

  test('invalidated', () => {
    const { message } = validate({ message: '' });
    expect(message).toBe('Please enter message');
  });
});
