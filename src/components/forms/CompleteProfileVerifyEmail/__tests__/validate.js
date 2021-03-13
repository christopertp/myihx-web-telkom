import validate from '../validate';

describe('src/components/forms/CompleteProfileVerifyEmail/validate', () => {
  test('validate', () => {
    const input1 = { verificationCode: '' };
    expect(validate(input1)).toMatchObject({
      verificationCode: 'Harus diisi',
    });

    const input2 = { verificationCode: '123123' };
    expect(validate(input2)).toMatchObject({
      verificationCode: '',
    });
  });
});
