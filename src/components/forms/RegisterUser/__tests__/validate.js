import validate from '../validate';

jest.mock('../../../../utils/validation', () => ({
  isEmail: v => v === 'test@telkom.co.id',
  isPhone: jest.fn(),
  isPassword: jest.fn(),
}));

describe('src/components/forms/RegisterUser/validate', () => {
  test('validate', () => {
    const input1 = { email: 'test' };
    expect(validate(input1)).toMatchObject({
      email: 'Mohon cantumkan email yang aktif',
    });

    const input2 = { email: 'test@telkom.co.id' };
    expect(validate(input2)).toMatchObject({
      email: '',
    });
  });
});
