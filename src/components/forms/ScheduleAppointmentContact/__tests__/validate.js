import validate from '../validate';

describe('src/components/forms/ScheduleAppointmentContact/validate', () => {
  test('validate', () => {
    const input1 = { fullName: 'a123', mobileNumber: 'a12' };
    expect(validate(input1)).toMatchObject({
      fullName: 'Harus diisi dengan alfabet',
      mobileNumber: 'Mohon cantumkan nomor ponsel yang aktif',
    });

    const input2 = { fullName: 'telkom', mobileNumber: '081234567890' };
    expect(validate(input2)).toMatchObject({
      fullName: '',
      mobileNumber: '',
    });
  });
});
