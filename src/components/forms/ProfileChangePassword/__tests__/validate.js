import validate from '../validate';

jest.mock('../../../../utils/validation', () => ({
  isPassword: v => v === 'secret123',
}));

describe('src/components/forms/ProfileChangePassword/validate', () => {
  test('validate', () => {
    const input1 = {
      currentPassword: '',
      newPassword: '',
    };
    expect(validate(input1)).toMatchObject({
      newPassword: 'Minimal 6 karakter terdiri dari gabungan huruf dan angka',
    });

    const input2 = {
      currentPassword: 'secret123',
      newPassword: 'secret123',
    };
    expect(validate(input2)).toMatchObject({
      newPassword: 'Password tidak boleh sama',
    });

    const input3 = {
      currentPassword: 'oldSecret123',
      newPassword: 'secret123',
    };
    expect(validate(input3)).toMatchObject({
      newPassword: '',
    });
  });
});
