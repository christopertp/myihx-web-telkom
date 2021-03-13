import validate from '../validate';

describe('src/components/forms/LoginPassword/validate', () => {
  test('validate', () => {
    const input1 = { password: '' };
    expect(validate(input1)).toMatchObject({
      password: 'Harus diisi',
    });

    const input2 = { password: 'tes' };
    expect(validate(input2)).toMatchObject({
      password: '',
    });
  });
});
