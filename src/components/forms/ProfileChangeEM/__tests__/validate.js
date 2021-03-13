import validate from '../validate';

jest.mock('../../../../utils/validation', () => ({
  isEmail: v => v === 'test@telkom.co.id',
  isPhone: v => v === '081234567890',
}));

describe('src/components/forms/ProfileChangeEM/validate', () => {
  test('validate', () => {
    const input1 = {
      email: '',
      mobile: '',
    };
    expect(validate(input1)).toMatchObject({
      email: 'Mohon cantumkan email yang aktif',
      mobile: 'Mohon cantumkan nomor ponsel yang aktif',
    });

    const input2 = {
      email: 'test@telkom.co.id',
      mobile: '',
    };
    expect(validate(input2)).toMatchObject({
      email: '',
      mobile: 'Mohon cantumkan nomor ponsel yang aktif',
    });

    const input3 = {
      email: '',
      mobile: '081234567890',
    };
    expect(validate(input3)).toMatchObject({
      email: 'Mohon cantumkan email yang aktif',
      mobile: '',
    });
  });
});
