import validate from '../validate';

jest.mock('../../../../utils/validation', () => ({
  isKTP: (v) => v === '1234567890123456',
  isSIM: (v) => v === '123456789012',
  isPassport: jest.fn(),
}));

describe('src/components/forms/CompleteProfileVerifyID/validate', () => {
  test('validate', () => {
    const input1 = { idNumber: '789' };
    expect(validate(input1)).toMatchObject({
      idNumber: 'Mohon masukkan id number yang benar',
    });

    const input2 = { idNumber: '1234567890123456' };
    expect(validate(input2)).toMatchObject({
      idNumber: '',
    });
  });
});
