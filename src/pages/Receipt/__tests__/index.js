import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Receipt, { ReceiptCard, List, Failed } from '../Receipt';
import Spinner from '../../../components/elements/Spinner';
import { FAILED } from '../constants';

jest.mock('../actions', () => ({
  fetchBillingDetail: jest.fn(),
  resetData: jest.fn(),
}));

const payDetail = [
  {
    detail: 'BIAYA INDIHOME',
    namount: 35000,
  },
  {
    detail: 'PAJAK',
    namount: 5000,
  },
];

useSelector.mockImplementation((fn) => {
  fn({});
  return {
    payId: '954001805220',
    payDate: '20191015',
    payTime: '214530',
    payLocation: 'FPC FINNET KOPEGTEL',
    payDetail,
    totalAmount: 45000,
  };
});

describe('src/pages/Receipt', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Receipt />);

    expect(tree).toMatchSnapshot();
  });

  test('ReceiptCard', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ReceiptCard />);

    expect(tree).toMatchSnapshot();
  });

  test('ReceiptCard zero bill status', () => {
    useEffect.mockImplementationOnce((f) => f()());
    useSelector.mockImplementationOnce(() => ({ payLocation: '' }));
    const result = ReceiptCard();
    expect(
      result.props.children[2].props.children[1].props.children[1].props.children[1].props.children,
    ).toEqual('-');
  });

  test('ReceiptCard close white icon', () => {
    global.innerWidth = 767;
    const result = ReceiptCard();
    expect(result.props.children[0].props.name).toEqual('close_white');
  });

  test('List', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List />);

    expect(tree).toMatchSnapshot();
  });

  test('Failed', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Failed />);

    expect(tree).toMatchSnapshot();
  });

  test('render loading state', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: true }));
    const result = Receipt();
    expect(result.props.children.type).toBe(Spinner);
  });

  test('failed state', () => {
    useSelector.mockImplementationOnce(() => ({ type: FAILED, message: 'err' }));
    const result = Receipt();
    expect(result.type).toBe(Failed);
  });

  test('render negative price', () => {
    useSelector.mockImplementationOnce(() => ({
      payDetail: [{ detail: 'DISKON', namount: -5000 }],
    }));
    const result = List();
    expect(result.props.children[0].props.children[1].props.children).toEqual('-Rp5.000');
  });
});
