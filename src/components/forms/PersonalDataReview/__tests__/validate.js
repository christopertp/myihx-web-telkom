import validate from '../validate';

describe('src/components/forms/PersonalDataReview/validate', () => {
  test('validate', () => {
    const input1 = {
      idNumber: '1a',
      motherName: 'm2',
      name: 'n1',
    };
    expect(validate(input1)).toMatchObject({
      idNumber: 'Harus diisi dengan angka',
      motherName: 'Harus diisi dengan alfabet',
      name: 'Harus diisi dengan alfabet',
    });

    const input2 = {
      idNumber: '1212',
      motherName: 'mother',
      name: 'name',
    };
    expect(validate(input2)).toMatchObject({
      idNumber: '',
      motherName: '',
      name: '',
    });
  });
});
