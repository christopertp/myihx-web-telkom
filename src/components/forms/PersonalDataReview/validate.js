export default function validate(values) {
  const { idNumber, motherName, name } = values;

  return {
    idNumber: !/^[0-9\s]+$/.test(idNumber) ? 'Harus diisi dengan angka' : '',
    motherName: !/^[a-zA-Z\s]+$/.test(motherName) ? 'Harus diisi dengan alfabet' : '',
    name: !/^[a-zA-Z\s]+$/.test(name) ? 'Harus diisi dengan alfabet' : '',
  };
}
