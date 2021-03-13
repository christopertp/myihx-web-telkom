import validate from '../validate';

describe('src/components/forms/ProfileRecoveryCode/validate', () => {
  test('validate', () => {
    const input1 = { recoveryCode: '' };
    expect(validate(input1)).toMatchObject({ recoveryCode: 'Harus diisi' });

    const input2 = { recoveryCode: '123' };
    expect(validate(input2)).toMatchObject({ recoveryCode: '' });
  });
});
