import validate from '../validate';

describe('src/components/forms/ForgotPasswordNew/validate', () => {
  test('validate', () => {
    const input1 = { password: '' };
    expect(validate(input1)).toMatchObject({
      password: 'Minimal 6 karakter terdiri dari gabungan huruf dan angka',
    });

    const input2 = { password: 'tes123' };
    expect(validate(input2)).toMatchObject({
      password: '',
    });
  });
});
