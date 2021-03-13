import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../Spinner';
import ModalReschedule, { Confirm, Reschedule } from '../ModalReschedule';

jest.mock('../../../../hooks/useTimer', () => () => ({
  time: ['', '', ''],
}));

useContext.mockImplementation(() => ({
  payload: { timeSlot: '' },
}));

useSelector.mockImplementation(fn => {
  fn({});
  return { fetchRescheduleDate: jest.fn(), isLoading: false };
});

describe('src/components/elements/ModalReschedule', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalReschedule open />);
    expect(tree).toMatchSnapshot();
    ModalReschedule.defaultProps.onClose();
  });

  test('render not open', () => {
    const result = ModalReschedule(ModalReschedule.defaultProps);
    expect(result).toBe(null);
  });

  test('render step 1', () => {
    useState
      .mockImplementationOnce(() => [{}, jest.fn()])
      .mockImplementationOnce(() => [1, jest.fn()]);
    const result = ModalReschedule({ ...ModalReschedule.defaultProps, open: true });
    expect(result.props.children.props.children.type).toBe(Confirm);
  });

  test('Confirm', () => {
    const setOverlay = jest.fn();
    useContext.mockImplementationOnce(() => ({ setOverlay }));

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Confirm />);
    expect(tree).toMatchSnapshot();
    expect(setOverlay).toHaveBeenCalled();
  });

  test('Confirm loading & error state and onSubmit', () => {
    const setOverlay = jest.fn();
    useContext.mockImplementationOnce(() => ({ setOverlay }));

    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    const fetchReschedule = jest.fn();
    useSelector.mockImplementationOnce(() => ({ fetchReschedule, isLoading: true, message: 'error' }));

    const result = Confirm();
    expect(result.props.children[4].props.children).toBe('error');

    const btnSubmit = result.props.children[5].props.children[1];
    expect(btnSubmit.props.children.type).toBe(Spinner);

    btnSubmit.props.onClick();
    expect(dispatch).toHaveBeenCalled();
  });

  test('Reschedule', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Reschedule />);
    expect(tree).toMatchSnapshot();
  });

  test('Reschedule onClick next', () => {
    const setStep = jest.fn();
    useContext.mockImplementationOnce(() => ({ setStep }));
    const result = Reschedule();
    const button = result.props.children[4].props.children[1];
    button.props.onClick();
    expect(setStep).toHaveBeenCalledWith(1);
  });
});
