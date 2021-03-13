import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import { getToken } from '../../../utils/storage';
import Bill, { Detail, Failed } from '../Bill';

jest.mock('../../../utils/storage');

jest.mock('../actions', () => ({
  fetchBill: jest.fn(),
}));

const details = [{
  amount: 3000,
  billName: 'MATERAI',
  billingInfo: 'FINNET SUBCA - BIMASAKTI',
}];

useSelector.mockImplementation(fn => {
  fn({});
  return {
    billingPeriod: 'June 2020',
    details,
    dueDate: '1 June 2020',
    status: 'UNPAID',
    totalAmount: 396525,
  };
});

describe('src/pages/Bill', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Bill />);

    getToken.mockImplementationOnce(() => false);
    expect(tree).toMatchSnapshot();
  });

  test('Detail', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...details[0]} />);
    expect(tree).toMatchSnapshot();
  });

  test('Failed', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Failed />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading state', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: true }));

    const result = Bill();
    expect(result.props.children[0].props.children[2].props.className).toBe('loading');
    expect(result.props.children[1].props.children[1].props.className).toBe('loading');
  });

  test('render not exist', () => {
    useSelector.mockImplementationOnce(
      () => ({ message: 'Bill not found' })
    );

    const result = Bill();
    expect(result.type).toBe(Failed);
  });

  test('Bill status paid', () => {
    const bill = { status: 'PAID' };
    const isLoading = false;
    useSelector.mockImplementationOnce(() => ({ ...bill, isLoading }));

    const result = Bill();
    expect(result.props.children[1].props.children[2].props.children.join('')).toBe('Sudah Dibayar');
  });
});
