import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import Payment, { Method, List, NotExist, Timer } from '../Payment';
import { fetchMethods } from '../actions';
import PaymentFailed from '../../../components/fragments/PaymentFailed';
import PaymentSuccess from '../../../components/fragments/PaymentSuccess';
import useTimer from '../../../hooks/useTimer';
import PaymentBankTransfer from '../../../components/fragments/PaymentBankTransfer';

jest.mock('../actions', () => ({
  fetchLinkAjaDebitCC: jest.fn(),
  fetchMethods: jest.fn(),
}));

const methods = [{
  icon: '',
  info: 'Pay with LinkAja',
  label: 'LinkAja',
  type: 'LINK_AJA',
  url: 'http://linkaja.com/1234/21312313',
},
{
  icon: '',
  info: 'Pay with DebitCC',
  label: 'DebitCC',
  type: 'DEBIT_CC',
  url: 'http://debit.com/1234/21312313',
},
{
  icon: '',
  info: 'Pay with TMONEY',
  label: 'TMoney',
  type: 'TMONEY',
  url: 'http://tmoney.com/1234/21312313',
},
{
  icon: '',
  info: 'Pay with Bank Transfer',
  label: 'LinkAja',
  type: 'BANK_TRANSFER',
  url: 'http://linkaja.com/1234/21312313',
},];

useSelector.mockImplementation(fn => {
  fn({});
  return {
    amount: 396525,
    methods,
    loading: { p: false },
    deadline: '2020-06-27T03:00:00.043Z',
    transactionId: 'MYIRX-986401919709',
  };
});

jest.mock('../../../hooks/useTimer', () => jest.fn(() => ({
  time: ['', '', ''],
})));

describe('src/pages/Payment', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Payment />);
    expect(tree).toMatchSnapshot();

    useParams.mockImplementationOnce(() => ({ method: 'failed' }));
    const result = Payment();
    expect(result.type).toBe(PaymentFailed);

    useParams.mockImplementationOnce(() => ({ method: 'deposit' }));
    const result2 = Payment();
    expect(result2.type).toBe(Method);

    useParams.mockImplementationOnce(() => ({ method: 'postpaid' }));
    const result3 = Payment();
    expect(result3.type).toBe(Method);

    useParams.mockImplementationOnce(() => ({ method: 'prepaid' }));
    const result4 = Payment();
    expect(result4.type).toBe(Method);

    useParams.mockImplementationOnce(() => ({ method: 'success' }));
    const result5 = Payment();
    expect(result5.type).toBe(PaymentSuccess);

    useParams.mockImplementationOnce(() => ({ detail: 'bank-transfer' }));
    const result6 = Payment();
    expect(result6.type).toBe(PaymentBankTransfer);
  });

  test('Method', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Method />);
    expect(tree).toMatchSnapshot();
  });

  test('List', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List />);
    expect(tree).toMatchSnapshot();
  });

  test('List call Bank Transfer', () => {
    const methods =  [{
      icon: '',
      info: 'Pay with Bank',
      label: 'Bank Transfer',
      type: 'BANK_TRANSFER',
      url: 'http://linkaja.com/1234/21312313',
    }];

    const history = { push: jest.fn() };
    useHistory.mockImplementationOnce(() => history);
    useSelector.mockImplementationOnce(() => ({ methods }));
    const result = List();
    result[0].props.onClick();
    expect(history.push).toHaveBeenCalled();
  });

  test('List call Debit CC', () => {
    const methods =  [{
      icon: '',
      info: 'Pay with DebitCC',
      label: 'DebitCC',
      type: 'DEBIT_CC',
      url: 'http://debit.com/1234/21312313',
    }];

    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);
    useSelector.mockImplementationOnce(() => ({ methods }));
    const result = List();
    result[0].props.onClick();
    expect(dispatch).toHaveBeenCalled();
  });

  test('List call LinkAja', () => {
    const methods =  [{
      icon: '',
      info: 'Pay with LinkAja',
      label: 'LinkAja',
      type: 'LINK_AJA',
      url: 'http://linkaja.com/1234/21312313',
    }];

    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);
    useSelector.mockImplementationOnce(() => ({ methods }));
    const result = List();
    result[0].props.onClick();
    expect(dispatch).toHaveBeenCalled();
  });

  test('List call TMONEY', () => {
    const methods =  [{
      icon: '',
      info: 'Pay with TMoney',
      label: 'TMoney',
      type: 'TMONEY',
      url: 'http://tmoney.com/1234/21312313',
    }];

    useSelector.mockImplementationOnce(() => ({ methods }));

    const result = List();
    result[0].props.onClick();
  });

  test('NotExist', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<NotExist />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading state', () => {
    useSelector.mockImplementationOnce(() => ({ loading: { p: true } }));

    const result = Method();
    expect(result.props.children[0].props.children[2].props.className).toBe('loading');
    expect(result.props.children[1].props.children[0].props.className).toBe('loading');
  });

  test('render not exist', () => {
    useSelector.mockImplementationOnce(
      () => ({ message: '"type" must be one of [postpaid, prepaid, deposit]' })
    );

    const result = Method();
    expect(result.type).toBe(NotExist);
  });

  test('call get payment methods', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);
    useParams.mockImplementationOnce(() => ({ method: 'deposit', code: 'MYIRX-986401919709' }));

    Method();
    expect(dispatch).toHaveBeenCalled();
    expect(fetchMethods).toHaveBeenCalledWith('deposit', 'MYIRX-986401919709');
  });

  test('Timer', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Timer />);
    expect(tree).toMatchSnapshot();
    useTimer.mockImplementationOnce(() => ({
      time: ['', '', ''],
    }));
  });
});
