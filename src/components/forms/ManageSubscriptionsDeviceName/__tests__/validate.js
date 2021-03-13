import validate from '../validate';

describe('src/components/forms/ManageSubscriptionsDeviceName/validate', () => {
  test('validate', () => {
    const input1 = { deviceName: '' };
    expect(validate(input1)).toMatchObject({
      deviceName: 'Harus diisi',
    });

    const input2 = { deviceName: 'test' };
    expect(validate(input2)).toMatchObject({
      deviceName: '',
    });
  });
});
