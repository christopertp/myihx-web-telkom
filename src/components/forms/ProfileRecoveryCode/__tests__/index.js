import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import useTimer from '../../../../hooks/useTimer';
import ProfileRecoveryCode from '../ProfileRecoveryCode';

jest.mock('../../../../hooks/useTimer', () => jest.fn(() => ({
  setTimer: jest.fn(),
  timer: 100,
  time: ['', '', ''],
})));

useSelector.mockImplementation(fn => {
  fn({});
  return { isLoading: { b: false } };
});

describe('src/components/forms/ProfileRecoveryCode', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProfileRecoveryCode />);
    expect(tree).toMatchSnapshot();
  });

  test('render Timeout and Loading', () => {
    const setTimer = jest.fn();
    useTimer.mockImplementationOnce(() => ({
      setTimer,
      timer: 0,
      time: ['', '', ''],
    }));
    ProfileRecoveryCode.defaultProps.handleSubmit();
    const result = ProfileRecoveryCode({
      ...ProfileRecoveryCode.defaultProps,
    });
    result.props.children[1].props.onClick();
    expect(setTimer).toHaveBeenCalled();
  });

  test('render Loading', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: { b: true } }));
    const result = ProfileRecoveryCode({
      ...ProfileRecoveryCode.defaultProps,
    });
    const button = result.props.children[2];
    expect(button.props.children.type).toBe(Spinner);
  });
});
