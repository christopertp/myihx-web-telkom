import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { getToken } from '../../../utils/storage';
import Help, { MainHelp, ResetModem, ModalReportIssues, Overlay } from '../Help';

jest.mock('../../../utils/storage');

jest.mock('../actions', () => ({
  fetchCreateTicket: jest.fn(),
  fetchReportIssues: jest.fn(),
  fetchResetModem: jest.fn(),
  fetchStatusCard: jest.fn(),
  fetchedAction: jest.fn(),
}));

const context = {
  modal: '',
  setModal: jest.fn(),
  closeModal: jest.fn(),
};

useContext.mockImplementation(() => context);

useSelector.mockImplementation(fn => {
  fn({});
  return {
    isLoading: { s: false },
    data: {
      activity: '',
      reset: '',
    },
  };
});

describe('src/pages/Help', () => {
  test('render routes', () => {
    const res1 = Help();
    expect(res1.props.children[0].type).toBe(MainHelp);

    useParams.mockImplementationOnce(() => ({ page: 'reset-modem' }));
    const res2 = Help();
    expect(res2.props.children[0].type).toBe(ResetModem);

    res2.props.value.closeModal();
  });

  test('MainHelp', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MainHelp />);
    expect(tree).toMatchSnapshot();
  });

  test('MainHelp openReportIssues', () => {
    const setModal = jest.fn();
    useContext.mockImplementationOnce(() => ({ ...context, setModal }));
    const res1 = MainHelp();
    res1.props.children[2].props.onClick();
    expect(setModal).toHaveBeenCalledWith('report-issues');

    getToken.mockImplementationOnce(() => false);
    useContext.mockImplementationOnce(() => ({ ...context, setModal }));
    const res2 = MainHelp();
    res2.props.children[2].props.onClick();
    expect(setModal).toHaveBeenCalledWith('login');
  });

  test('MainHelp openResetModem', () => {
    const push = jest.fn();
    useHistory.mockImplementationOnce(() => ({ push }));
    const res1 = MainHelp();
    res1.props.children[3].props.onClick();
    expect(push).toHaveBeenCalledWith('/help/reset-modem');

    getToken.mockImplementationOnce(() => false);
    const setModal = jest.fn();
    useContext.mockImplementationOnce(() => ({ ...context, setModal }));
    const res2 = MainHelp();
    res2.props.children[3].props.onClick();
    expect(setModal).toHaveBeenCalledWith('login');
  });

  test('ResetModem', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ResetModem />);
    expect(tree).toMatchSnapshot();
  });

  test('ResetModem openResetResult', () => {
    const setModal = jest.fn();
    useContext.mockImplementationOnce(() => ({ ...context, setModal }));
    useSelector.mockImplementationOnce(() => ({ isLoading: { r: false }, data: { reset: 'success' } }));
    ResetModem();
    expect(setModal).toHaveBeenCalledWith('reset-result');
  });

  test('ResetModem onClick', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);
    useEffect.mockImplementationOnce(f => f()());
    useSelector.mockImplementationOnce(() => ({ isLoading: { r: true }, data: { reset: 'failed' } }));
    const res1 = ResetModem();
    const valueButton = res1.props.children[0].props.children[2].props;
    valueButton.onClick();
    expect(dispatch).toHaveBeenCalled();
    expect(valueButton.children).toBe('Resetting... please wait');

    const setModal = jest.fn();
    useContext.mockImplementationOnce(() => ({ ...context, setModal }));
    useSelector.mockImplementationOnce(() => ({ isLoading: { r: true }, data: { reset: 'success' } }));
    const res2 = ResetModem();
    setModal('reset-result');
    res2.props.children[1].props.children[3].props.onClick();
    expect(setModal).toHaveBeenCalledWith('');

    useContext.mockImplementationOnce(() => ({ ...context, setModal }));
    useSelector.mockImplementationOnce(() => ({ isLoading: { r: true }, data: { reset: 'failed' } }));
    const res3 = ResetModem();
    setModal('reset-result');
    res3.props.children[1].props.children[3].props.onClick();
    expect(setModal).toHaveBeenCalledWith('report-issues');
  });

  test('ModalReportIssues', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalReportIssues onClose={jest.fn()} open />);
    expect(tree).toMatchSnapshot();
  });

  test('ModalReportIssues onSubmit', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);
    const res = ModalReportIssues({ onClose: jest.fn(), open: true });
    res.props.children[3].props.onSubmit();
    expect(dispatch).toHaveBeenCalled();
  });

  test('Overlay', () => {
    const setOverlay = jest.fn();
    useContext.mockImplementationOnce(() => ({ setOverlay }));
    Overlay();
    expect(setOverlay).toHaveBeenCalledWith(false);
  });
});
