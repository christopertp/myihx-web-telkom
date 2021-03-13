import validate from '../validate';

describe('src/components/forms/ProfileEdit/validate', () => {
  test('validate', () => {
    const input1 = {
      address: '',
      dateOfBirth: '',
      fullName: '',
      gender: '',
    };
    expect(validate(input1)).toMatchObject({
      address: 'Harus diisi',
      dateOfBirth: 'Harus diisi',
      fullName: 'Harus diisi',
      gender: 'Harus dipilih',
    });

    const input2 = {
      address: 'Jl. Garnisun No.1',
      dateOfBirth: '17-08-1945',
      fullName: 'telkom dev oye',
      gender: 'male',
    };
    expect(validate(input2)).toMatchObject({
      address: '',
      dateOfBirth: '',
      fullName: '',
      gender: '',
    });
  });
});
