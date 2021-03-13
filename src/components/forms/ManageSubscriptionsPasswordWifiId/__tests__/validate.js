import validate from '../validate';

describe('src/components/forms/ManageSubscriptionsPasswordWifiId/validate', () => {
  test('validate', () => {
    const input1 = { passwordWifiId: '' };
    expect(validate(input1)).toMatchObject({
      passwordWifiId: 'Harus diisi',
    });

    const input2 = { passwordWifiId: 'test' };
    expect(validate(input2)).toMatchObject({
      passwordWifiId: '',
    });
  });
});
