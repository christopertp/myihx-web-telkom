import validate from '../validate';

describe('src/components/forms/HelpReportIssues/validate', () => {
  test('validated', () => {
    const { type, issueId } = validate({ type: '01', issueId: '0101' });
    expect(type).toBe('');
    expect(issueId).toBe('');
  });

  test('invalidat', () => {
    const { type, issueId } = validate({ type: '', issueId: '' });
    expect(type).toBe('Please select category');
    expect(issueId).toBe('Please select issue');
  });
});
