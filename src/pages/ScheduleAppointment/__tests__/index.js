import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../components/elements/Spinner';
import useTimer from '../../../hooks/useTimer';
import ScheduleAppointment, { Schedule, IssueInfo, Modals, Success } from '../ScheduleAppointment';

jest.mock('../../../hooks/useTimer', () => jest.fn(() => ({})));

jest.mock('../actions', () => ({
  fetchDate: jest.fn(),
  fetchInstallationInfo: jest.fn(),
  fetchPost: jest.fn(),
}));

const context = {
  modal: '',
  setModal: jest.fn(),
  setPayload: jest.fn(),
  payload: {
    timeSlot: {
      date: '',
    },
  },
};
useContext.mockImplementation(() => context);

useParams.mockImplementation(() => ({
  page: '',
  type: 'installation',
}));

useSelector.mockImplementation(fn => {
  fn({});
  return { isLoading: '', issueId: 'MIXN-01' };
});

describe('src/pages/ScheduleAppointment', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ScheduleAppointment />);
    expect(tree).toMatchSnapshot();
  });

  test('render subroute', () => {
    const replace = jest.fn();
    useHistory.mockImplementationOnce(() => ({ replace }));
    useParams.mockImplementationOnce(() => ({ page: 'success', type: 'installation' }));

    const result = ScheduleAppointment();
    expect(replace).toHaveBeenCalledWith('/schedule-installation');
    expect(result.props.children.type).toBe(Success);

    useHistory.mockImplementationOnce(() => ({ replace }));
    useParams.mockImplementationOnce(() => ({ type: '' }));

    ScheduleAppointment();
    expect(replace).toHaveBeenCalledWith('/');
  });

  test('Schedule', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Schedule />);
    expect(tree).toMatchSnapshot();
  });

  test('Schedule error, onRetry, & loading state', () => {
    const setModal = jest.fn();
    useContext.mockImplementationOnce(() => ({ ...context, modal: 'timeout', setModal }));

    useSelector.mockImplementationOnce(() => ({ isLoading: { s: true }, message: 'error' }));

    const setTimer = jest.fn();
    useTimer.mockImplementationOnce(() => ({ setTimer, timer: true }));

    const result = Schedule();
    const whiteCardChildren = result.props.children[0].props.children;
    expect(whiteCardChildren[4].props.children).toBe('error');
    expect(whiteCardChildren[5].props.children[1].props.children.type).toBe(Spinner);

    result.props.children[1].props.onRetry();
    expect(setTimer).toHaveBeenCalled();
    expect(setModal).toHaveBeenCalledWith('');
  });

  test('Schedule modal 404, IssueInfo, & modal onClose', () => {
    const setModal = jest.fn();
    useContext.mockImplementationOnce(() => ({ ...context, setModal }));

    useParams.mockImplementationOnce(() => ({ type: 'service' }));

    useSelector.mockImplementationOnce(() => ({ isLoading: '', message: '404' }));
    const result = Schedule();
    expect(setModal).toHaveBeenCalledWith('404');
    expect(result.props.children[0].props.children[1].type).toBe(IssueInfo);

    result.props.children[1].props.onRetry();
    expect(setModal).toHaveBeenCalledWith('');
  });

  test('Schedule payloadReducer, and onSubmit', () => {
    const setPayload = jest.fn();
    useContext.mockImplementationOnce(() => ({ ...context, payload: {}, setPayload }));

    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    const result = Schedule();
    const whiteCardChildren = result.props.children[0].props.children;
    whiteCardChildren[2].props.setPayload({ data: 'tes' });
    expect(setPayload).toHaveBeenCalledWith({ data: 'tes' });

    whiteCardChildren[5].props.children[1].props.onClick();
    expect(dispatch).toHaveBeenCalled();
  });

  test('IssueInfo', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<IssueInfo />);
    expect(tree).toMatchSnapshot();
  });

  test('IssueInfo loading state', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: { d: true } }));
    const result = IssueInfo();
    const [issue, address] = result.props.children;
    expect(issue.props.children[1].props.children.props.className).toBe('loading');
    expect(address.props.children[1].props.className).toBe('loading');
  });

  test('Modals', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Modals onRetry={() => {}} />);
    expect(tree).toMatchSnapshot();
  });

  test('Success', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Success />);
    expect(tree).toMatchSnapshot();
  });

  test('Success service page', () => {
    useParams.mockImplementationOnce(() => ({ type: 'service' }));
    const result = Success();
    expect(result.props.subtitle).toBe('Our technician will visit you on');
    expect(result.props.children[1].props.children).toBe('View Report Progress');
  });
});
