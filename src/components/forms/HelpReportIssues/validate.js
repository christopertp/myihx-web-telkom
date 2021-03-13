export default function validate(values) {
  const { type, issueId } = values;
  return {
    type: !type ? 'Please select category' : '',
    issueId: !issueId ? 'Please select issue' : '',
  };
}
