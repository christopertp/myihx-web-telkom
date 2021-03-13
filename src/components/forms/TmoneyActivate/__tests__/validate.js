import validate from '../validate';

describe('scr/components/forms/TmoneyActivate/validate', () => {
  test('validate', () => {
    const errorMessage = 'Password must contain at least 8 characters, one number and both lower and uppercase letters';
    const input1 = { password: '' };
    expect(validate(input1)).toMatchObject({
      password: errorMessage,
    });

    const input2 = { password: '123' };
    expect(validate(input2)).toMatchObject({
      password: errorMessage,
    });

    const input3 = { password: '12345678' };
    expect(validate(input3)).toMatchObject({
      password: errorMessage,
    });

    const input4 = { password: '1234567a' };
    expect(validate(input4)).toMatchObject({
      password: errorMessage,
    });

    const input5 = { password: '123456Aa' };
    expect(validate(input5)).toMatchObject({
      password: '',
    });
  });
});
