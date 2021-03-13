import validate from '../validate';

jest.mock('../../../../utils/validation', () => ({
  isEmail: v => v === 'tes@telkom.co.id',
  isPhone: jest.fn(),
}));

describe('src/components/forms/LoginUser/validate', () => {
  test('validate', () => {
    const input1 = { user: 'tes' };
    expect(validate(input1)).toMatchObject({
      user: 'Mohon masukkan nomor ponsel / email yang benar',
    });

    const input2 = { user: 'tes@telkom.co.id' };
    expect(validate(input2)).toMatchObject({
      user: '',
    });
  });
});
