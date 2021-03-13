import { FAILED, FETCHED, LOADING, BANK_FETCHED, STATUS_FETCHED, COPIED } from '../constants';
import reducer from '../reducer';

describe('src/pages/Payment/reducer', () => {
  test('case FAILED', () => {
    const data = { message: 'test' };
    const result = reducer({}, { type: FAILED, ...data });
    expect(result.loading.p).toBe(false);
    expect(result.message).toBe('test');
  });

  test('case BANK_FETCHED', () => {
    const data = {
      codeBank: 'vamandiri',
      deadline: '2020-06-27T03:00:00.043Z',
      detailBank: [{
        name: 'Mandiri',
        icon: 'http://minio-myihx-dev-myihx-dev.vsan-apps.playcourt.id/assets/icons/MANDIRI.png',
        details: [{
          name: 'ATM',
          howToPay: [{
            header: 'Masukkan kartu ATM dan PIN Mandiri Anda',
            description: '',
          }],
        }],
      }],
      paymentCode: '8029000000026833',
      transactionId: 'MYIRX-1591892979904',
    };
    const result = reducer({}, { type: BANK_FETCHED, ...data });
    expect(result.loading.b).toBe(false);
    expect(result.message).toBe('');
    expect(result.codeBank).toBe('vamandiri');
    expect(result.deadline).toBe('2020-06-27T03:00:00.043Z');
    expect(result.detailBank).toStrictEqual([{
      name: 'Mandiri',
      icon: 'http://minio-myihx-dev-myihx-dev.vsan-apps.playcourt.id/assets/icons/MANDIRI.png',
      details: [{
        name: 'ATM',
        howToPay: [{
          header: 'Masukkan kartu ATM dan PIN Mandiri Anda',
          description: '',
        }],
      }],
    }]);
    expect(result.paymentCode).toBe('8029000000026833');
    expect(result.transactionId).toBe('MYIRX-1591892979904');
  });

  test('case STATUS_FETCHED', () => {
    const data = {
      productInfo: {
        value: 50,
        unit: 'Mbps',
        name: 'Indihome Fiber Triple Play Prestige',
        description: '50 Mbps, UseeTV Essential, Free Local SLJJ 1000 menit, wifi.id Seamless, Cloud Storage 8Gb, Movin Phone, HOOQ, Iflix',
        productDetails: [{
          title: 'First month deposit',
          amount: 825000,
        },
        {
          title: 'Tax 10%',
          amount: 82500,
        }],
      },
      customer: {
        name: 'squad4test2',
        identityType: 'ktp',
        identityNumber: '123123',
        installationAddress: 'Jl. Bintaro Puspita Raya Blok A No.9, RT.9/RW.2, Pesanggrahan, Kec. Pesanggrahan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12320, Indonesia',
        province: 'Bali',
        cityName: 'DENPASAR',
        postCode: '80222',
      },
      deadline: '2020-06-27T03:00:00.043Z',
      paymentType: 'DEPOSIT',
      totalDue: 907500,
      paymentStatus: 'SUCCESS',
    };
    const result = reducer({}, { type: STATUS_FETCHED, ...data });
    expect(result.loading.s).toBe(false);
    expect(result.message).toBe('');
    expect(result.paymentType).toBe('DEPOSIT');
    expect(result.paymentStatus).toBe('SUCCESS');
    expect(result.totalDue).toBe(907500);
    expect(result.deadline).toBe('2020-06-27T03:00:00.043Z');
    expect(result.productInfo).toStrictEqual({
      value: 50,
      unit: 'Mbps',
      name: 'Indihome Fiber Triple Play Prestige',
      description: '50 Mbps, UseeTV Essential, Free Local SLJJ 1000 menit, wifi.id Seamless, Cloud Storage 8Gb, Movin Phone, HOOQ, Iflix',
      productDetails: [{
        title: 'First month deposit',
        amount: 825000,
      },
      {
        title: 'Tax 10%',
        amount: 82500,
      }],
    });
    expect(result.customer).toStrictEqual({
      name: 'squad4test2',
      identityType: 'ktp',
      identityNumber: '123123',
      installationAddress: 'Jl. Bintaro Puspita Raya Blok A No.9, RT.9/RW.2, Pesanggrahan, Kec. Pesanggrahan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12320, Indonesia',
      province: 'Bali',
      cityName: 'DENPASAR',
      postCode: '80222',
    });
  });

  test('case FETCHED', () => {
    const data = {
      amount: 396525,
      deadline: '2020-06-27T03:00:00.043Z',
      transactionId: 'MYIRX-15918929621814',
      methods: [{
        methodId: '5ed32155-6017-4683-adef-ffc7a9ca9e9d',
        label: 'LinkAja',
        info: 'Pay with LinkAja',
        icon: 'http://minio-myihx-dev-myihx-dev.vsan-apps.playcourt.id/assets/icons/linkAja.png',
        isWebView: true,
        type: 'LINK_AJA',
      }],
      bankInfo: [{
        name: 'Mandiri',
        icon: 'http://minio-myihx-dev-myihx-dev.vsan-apps.playcourt.id/assets/icons/MANDIRI.png',
        details: [{
          name: 'ATM',
          howToPay: [{
            header: 'Masukkan kartu ATM dan PIN Mandiri Anda',
            description: '',
          }],
        }],
      }],
    };
    const result = reducer({}, { type: FETCHED, ...data });
    expect(result.loading.p).toBe(false);
    expect(result.message).toBe('');
    expect(result.amount).toBe(396525);
    expect(result.deadline).toBe('2020-06-27T03:00:00.043Z');
    expect(result.transactionId).toBe('MYIRX-15918929621814');
    expect(result.methods).toStrictEqual([{
      methodId: '5ed32155-6017-4683-adef-ffc7a9ca9e9d',
      label: 'LinkAja',
      info: 'Pay with LinkAja',
      icon: 'http://minio-myihx-dev-myihx-dev.vsan-apps.playcourt.id/assets/icons/linkAja.png',
      isWebView: true,
      type: 'LINK_AJA',
    }]);
    expect(result.bankInfo).toStrictEqual([{
      name: 'Mandiri',
      icon: 'http://minio-myihx-dev-myihx-dev.vsan-apps.playcourt.id/assets/icons/MANDIRI.png',
      details: [{
        name: 'ATM',
        howToPay: [{
          header: 'Masukkan kartu ATM dan PIN Mandiri Anda',
          description: '',
        }],
      }],
    }]);
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, loading: true, key: 'p' });
    expect(result.loading.p).toBe(true);
  });

  test('case COPIED', () => {
    const data = { message: 'test' };
    const result = reducer({}, { type: COPIED, ...data });
    expect(result.loading.b).toBe(false);
    expect(result.message).toBe('test');
  });

  test('case default', () => {
    const result = reducer();
    expect(result.amount).toBe(0);
    expect(result.bankInfo).toBe('');
    expect(result.codeBank).toBe('');
    expect(result.customer).toBe('');
    expect(result.productInfo).toBe('');
    expect(result.deadline).toBe('');
    expect(result.detailBank).toBe('');
    expect(result.loading.p).toBe(true);
    expect(result.message).toBe('');
    expect(result.methods).toBe('');
    expect(result.paymentCode).toBe('');
    expect(result.paymentStatus).toBe('');
    expect(result.paymentType).toBe('');
    expect(result.transactionId).toBe('');
  });
});
