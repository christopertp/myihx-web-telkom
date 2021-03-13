export default function validate(values) {
  const { topicId, message } = values;
  const mustBeFilled = 'Harus diisi';

  return {
    topicId: !topicId ? 'Harus dipilih' : '',
    message: !message ? mustBeFilled : '',
  };
}
