export default function validate(values) {
  const {
    provinceCode,
    cityCode,
    districtCode,
    streetCode,
    addressDescription,
    postalCode,
  } = values;
  return {
    provinceCode: !provinceCode ? 'Please select province' : '',
    cityCode: !cityCode ? 'Please select city' : '',
    districtCode: !districtCode ? 'Please select district' : '',
    streetCode: !streetCode ? 'Please select nearest address' : '',
    addressDescription: !addressDescription ? 'Please enter the address' : '',
    postalCode: !postalCode ? 'Please enter zip code' : '',
  };
}
