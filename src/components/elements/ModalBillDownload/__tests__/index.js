import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import moment from 'moment';
import ModalBillDownload from '../ModalBillDownload';

moment.mockImplementation(() => ({
  month: () => ({ year: () => ({ format: () => 'June 2020' }) }),
}));

useSelector.mockImplementation(fn => {
  const data = [
    {
      period: '202004',
      channel: 'FINNET SUBCA - INDOMART',
      status: 'PAID',
      paymentDate: '20200407',
      paymentTime: '100856',
      totalAmount: 388000
    }
  ];
  fn({});
  return { data, fetchBillDownload: jest.fn(), notifMessage: '', };
});

describe('src/components/elements/ModalBillDownload', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalBillDownload open />);
    expect(tree).toMatchSnapshot();
    ModalBillDownload.defaultProps.onClose();
  });

  test('render checkBox', () => {
    const setChecked = jest.fn();
    useState.mockImplementationOnce(() => [['202004'], setChecked]);

    const result = ModalBillDownload({ onClose: () => false, open: true });
    result.props.children[1].props.children[0].props.children[1].props.onChange();
    expect(setChecked).toHaveBeenCalled();

    useState.mockImplementationOnce(() => [['123'], setChecked]);

    const result2 = ModalBillDownload({ onClose: () => false, open: true });
    result2.props.children[1].props.children[0].props.children[1].props.onChange();
    expect(setChecked).toHaveBeenCalled();
  });

  test('render onSubmit', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch );

    const result = ModalBillDownload({ onClose: () => false, open: true });
    result.props.children[2].props.onClick();
    expect(dispatch).toHaveBeenCalled();
  });
});
