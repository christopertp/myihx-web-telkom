import validate from '../validate';

describe('src/components/forms/SendFeedback/validate', () => {
  test('validate', () => {
    const input1 = {
      topicId: 'test',
      message: 'test',
    };
    expect(validate(input1)).toMatchObject({
      topicId: '',
      message: '',
    });

    const input2 = {
      topicId: '',
      message: '',
    };
    expect(validate(input2)).toMatchObject({
      topicId: 'Harus dipilih',
      message: 'Harus diisi',
    });
  });
});
