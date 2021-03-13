import validate from '../validate';

describe('src/components/forms/CheckCoverageAddress/validate', () => {
  test('validate', () => {
    const input1 = {
      provinceCode: 'test',
      cityCode: 'test',
      districtCode: 'test',
      streetCode: 'test',
      addressDescription: 'test',
      postalCode: 'test',
    };
    expect(validate(input1)).toMatchObject({
      provinceCode: '',
      cityCode: '',
      districtCode: '',
      streetCode: '',
      addressDescription: '',
      postalCode: '',
    });

    const input2 = {
      provinceCode: '',
      cityCode: '',
      districtCode: '',
      streetCode: '',
      addressDescription: '',
      postalCode: '',
    };
    expect(validate(input2)).toMatchObject({
      provinceCode: 'Please select province',
      cityCode: 'Please select city',
      districtCode: 'Please select district',
      streetCode: 'Please select nearest address',
      addressDescription: 'Please enter the address',
      postalCode: 'Please enter zip code',
    });
  });
});
