import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import HomePrimaryActions, { Bill, BillContainer, Browse, Usage } from '../HomePrimaryActions';

useSelector.mockImplementation(fn => {
  fn({});
  return {
    bill: {
      billDate: '1 June 2020',
      status: 'UNPAID',
      totalAmount: 396525,
    },
    isLoading: false,
  };
});

moment.mockImplementation(() => ({
  locale: () => ({ format: () => '1 Juni 2020' }),
  format: () => '202006',
}));

describe('src/components/fragments/HomePrimaryActions', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<HomePrimaryActions />);
    expect(tree).toMatchSnapshot();
  });

  test('Bill', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Bill />);
    expect(tree).toMatchSnapshot();
  });

  test('BillContainer', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<BillContainer />);
    expect(tree).toMatchSnapshot();
  });

  test('Browse', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Browse />);
    expect(tree).toMatchSnapshot();
  });

  test('Usage', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Usage />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading state', () => {
    const isLoading = { b: true };
    useSelector.mockImplementationOnce(() => ({ isLoading }));

    const result = HomePrimaryActions();
    expect(result.props.children.props.className).toBe('loading');
  });

  test('no status', () => {
    const bill = { status: '' };
    const isLoading = { b: false };

    useSelector.mockImplementationOnce(() => ({ bill, isLoading }));
    const result = Bill();
    expect(result.props.children[0].props.children[1].props.children).toBe(undefined);

    useSelector.mockImplementationOnce(() => ({ bill, isLoading }));
    const result2 = BillContainer(BillContainer.defaultProps);
    expect(result2.type).toBe('div');
  });

  test('status no bill', () => {
    const bill = { status: 'NO_BILL' };
    const isLoading = { b: false };
    useSelector.mockImplementationOnce(() => ({ bill, isLoading }));

    const result = HomePrimaryActions();
    expect(result.props.children.type).toBe(Browse);
  });

  test('status no data', () => {
    const bill = { status: 'NO_DATA' };
    const isLoading = { b: false };

    useSelector.mockImplementationOnce(() => ({ bill, isLoading }));
    const result = Bill();
    expect(result.props.children[0].props.children[1].props.children).toBe('Belum Ada');

    useSelector.mockImplementationOnce(() => ({ bill, isLoading }));
    const result2 = BillContainer(BillContainer.defaultProps);
    expect(result2.type).toBe('div');
  });

  test('status paid', () => {
    const bill = { billingPeriod: 'Jun 2020', status: 'PAID' };
    const isLoading = { b: false };

    useSelector.mockImplementationOnce(() => ({ bill, isLoading }));
    const result = Bill();
    expect(result.props.children[0].props.children[1].props.children).toBe('Sudah Dibayar');

    useSelector.mockImplementationOnce(() => ({ bill, isLoading }));
    const result2 = BillContainer(BillContainer.defaultProps);
    expect(result2.props.to).toBe('/receipt/202006');
  });

  test('status unpaid', () => {
    const result = HomePrimaryActions();
    const { children } = result.props.children.props;
    expect(children[0].type).toBe(Bill);
  });
});
