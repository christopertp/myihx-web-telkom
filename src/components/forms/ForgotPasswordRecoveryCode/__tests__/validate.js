import validate from '../validate';

describe('src/components/forms/ForgotPasswordRecoveryCode/validate', () => {
  test('validate', () => {
    const input1 = { code: '' };
    expect(validate(input1)).toMatchObject({
      code: 'Harus diisi',
    });

    const input2 = { code: 'tes' };
    expect(validate(input2)).toMatchObject({
      code: '',
    });
  });
});
