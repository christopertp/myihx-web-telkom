import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import useTimer from '../../../../hooks/useTimer';
import CompleteProfileVerifyEmail from '../CompleteProfileVerifyEmail';

jest.mock('../../../../hooks/useTimer', () =>
  jest.fn(() => ({
    setTimer: jest.fn(),
    timer: 100,
    time: ['', '', ''],
  })),
);

useSelector.mockImplementation((fn) => {
  fn({ completeProfile: '' });
  return { isLoading: false };
});

describe('src/components/forms/CompleteProfileVerifyEmail', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CompleteProfileVerifyEmail />);
    expect(tree).toMatchSnapshot();

    useSelector.mockImplementationOnce(() => ({ isLoading: true }));
    CompleteProfileVerifyEmail.defaultProps.handleSubmit();
    const result = CompleteProfileVerifyEmail({
      ...CompleteProfileVerifyEmail.defaultProps,
      message: 'test',
    });
    const button = result.props.children[3];
    expect(button.props.children.type).toBe(Spinner);
  });

  test('resend code', () => {
    const setTimer = jest.fn();
    useTimer.mockImplementationOnce(() => ({
      setTimer,
      timer: 0,
      time: ['', '', ''],
    }));
    CompleteProfileVerifyEmail.defaultProps.handleSubmit();
    const result = CompleteProfileVerifyEmail({
      ...CompleteProfileVerifyEmail.defaultProps,
    });
    result.props.children[2].props.onClick();
    expect(setTimer).toHaveBeenCalled();
  });
});
