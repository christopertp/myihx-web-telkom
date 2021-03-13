import React from 'react';
import { set } from 'mockdate';
import { useDispatch, useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import PaymentFailed from '../PaymentFailed';

const store = {
  timeInSeconds: 0,
  fetchPaymentStatus: jest.fn(),
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
  paymentStatus: 'FAILED',
};

useSelector.mockImplementation(fn => {
  fn({});
  return store;
});

describe('src/components/fragments/PaymentFailed', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PaymentFailed />);
    expect(tree).toMatchSnapshot();
  });

  test('call get payment status', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    PaymentFailed();
    expect(dispatch).toHaveBeenCalled();
  });

  test('Timeout', () => {
    const deadline = new Date();
    useSelector.mockImplementationOnce(() => ({ ...store, deadline }));
    set('2020-06-27T03:00:00.043Z');

    const result = PaymentFailed();
    expect(result.props.children[1].props.children[1].props.children).toBe('Payment Failed');
    expect(result.props.children[1].props.children[2].props.children).toBe('Sorry, it seems like your payment has failed. Please try again!');
  });
});
