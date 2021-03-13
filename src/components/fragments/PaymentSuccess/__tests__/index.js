import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import PaymentSuccess from '../PaymentSuccess';

useSelector.mockImplementation(fn => {
  fn({});
  return {
    fetchPaymentStatus: jest.fn(),
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
    paymentStatus: 'SUCCESS',
    paymentType: 'DEPOSIT',
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
    totalDue: 907500,
  };
});

describe('src/components/fragments/PaymentSuccess', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PaymentSuccess />);
    expect(tree).toMatchSnapshot();
  });

  test('call get payment status', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    PaymentSuccess();
    expect(dispatch).toHaveBeenCalled();
  });
});
