export default function validate(values) {
  const { address, dateOfBirth, fullName, gender } = values;
  const mustBeFilled = 'Harus diisi';

  return {
    address: !address ? mustBeFilled : '',
    dateOfBirth: !dateOfBirth ? mustBeFilled : '',
    fullName: !fullName ? mustBeFilled : '',
    gender: !gender ? 'Harus dipilih' : '',
  };
}
