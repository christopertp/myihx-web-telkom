export default function validate(values) {
  const { message } = values;
  return {
    message: !message ? 'Please enter message' : '',
  };
}
