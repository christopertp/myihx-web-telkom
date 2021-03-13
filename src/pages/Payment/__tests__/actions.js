import { paymentMethod, paymentBankTransfer, paymentLinkAjaDebitCC, paymentGetStatus } from '../../../services/payment';
import * as actions from '../actions';
import { FAILED, FETCHED, LOADING, BANK_FETCHED, STATUS_FETCHED, COPIED } from '../constants';

jest.mock('../../../services/payment', () => ({
  paymentMethod: jest.fn(),
  paymentBankTransfer: jest.fn(),
  paymentLinkAjaDebitCC: jest.fn(),
  paymentGetStatus: jest.fn(),
}));

describe('src/pages/Payment/actions', () => {
  test('fetchMethods', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

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

    paymentMethod.mockResolvedValueOnce({ data });
    await actions.fetchMethods()(dispatch);
    expectTest(1, { type: LOADING, loading: true, key: 'p' });
    expectTest(2, {
      type: FETCHED,
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
    });

    paymentMethod.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchMethods()(dispatch);
    expectTest(4, { type: FAILED, message: 'error' });
  });

  test('fetchBankTransfer', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const data = {
      codeBank: 'vamandiri',
      deadline: '2020-06-27T03:00:00.043Z',
      detailBank: {
        name: 'Mandiri',
        icon: 'http://minio-myihx-dev-myihx-dev.vsan-apps.playcourt.id/assets/icons/MANDIRI.png',
        details: [{
          name: 'ATM',
          howToPay: [{
            header: 'Masukkan kartu ATM dan PIN Mandiri Anda',
            description: '',
          }],
        }],
      },
      paymentCode: '8029000000026833',
      redirectUrl: 'https://mytelkomsel.finnet-indonesia.com/topup/howto.php?invoice=1591892979904&amount=10000&timeout=180&payment_code=8029000000026833&sof_id=vabni',
      tfAmount: 907500,
      transactionId: 'MYIRX-1591892979904',
    };

    const detailBank = {
      name: 'Mandiri',
      icon: 'http://minio-myihx-dev-myihx-dev.vsan-apps.playcourt.id/assets/icons/MANDIRI.png',
      details: [{
        name: 'ATM',
        howToPay: [{
          header: 'Masukkan kartu ATM dan PIN Mandiri Anda',
          description: '',
        }],
      }],
    };

    paymentBankTransfer.mockResolvedValueOnce({ data });
    await actions.fetchBankTransfer('', '', 'vamandiri', 'MYIRX-1591892979904', detailBank)(dispatch);
    expectTest(1, { type: LOADING, loading: true, key: 'b' });
    expectTest(2, {
      type: BANK_FETCHED,
      codeBank: 'vamandiri',
      deadline: '2020-06-27T03:00:00.043Z',
      detailBank,
      paymentCode: '8029000000026833',
      transactionId: 'MYIRX-1591892979904',
    });
    expectTest(3, `bank-transfer/vamandiri`);

    paymentBankTransfer.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchBankTransfer('', '', 'vamandiri', 'MYIRX-1591892979904', detailBank)(dispatch);
    expectTest(4, { type: LOADING, loading: true, key: 'b' });
    expectTest(5, '/payment-MYIRX-1591892979904/failed?invoice=1591892979904');
  });

  test('fetchLinkAjaDebitCC', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const data = {
      deadline: '2020-06-27T03:00:00.043Z',
      paymentCode: '8029000000026833',
      redirectUrl: 'https://mytelkomsel.finnet-indonesia.com/topup/howto.php?invoice=1591892979904&amount=10000&timeout=180&payment_code=8029000000026833&sof_id=vabni',
      tfAmount: 907500,
      transactionId: 'MYIRX-1591892979904',
    };

    const method = {
      amount: 907500,
      transactionId: 'MYIRX-1591892979904',
      type: 'LINK_AJA'
    };

    paymentLinkAjaDebitCC.mockResolvedValueOnce({ data });
    await actions.fetchLinkAjaDebitCC('deposit', method)(dispatch);

    paymentLinkAjaDebitCC.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchLinkAjaDebitCC('deposit', method)(dispatch);
    expectTest(1, '/payment-MYIRX-1591892979904/failed?invoice=1591892979904');
  });

  test('fetchPaymentStatus', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

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

    paymentGetStatus.mockResolvedValueOnce({ data });
    await actions.fetchPaymentStatus()(dispatch);
    expectTest(1, { type: LOADING, loading: true, key: 's' });
    expectTest(2, {
      type: STATUS_FETCHED,
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
    });

    paymentGetStatus.mockRejectedValueOnce({ message: 'error' });
    await actions.fetchPaymentStatus()(dispatch);
    expectTest(4, { type: FAILED, message: 'error' });
  });

  test('setMessageAction', () => {
    const message = 'test';
    expect(actions.setMessageAction(message)).toStrictEqual({ message: 'test', type: COPIED });
  });

});
