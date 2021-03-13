import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import InstallationSchedule from '../InstallationSchedule';

useSelector.mockImplementation(fn => {
  fn({});
  return {
    isLoading: { d: false },
    schedule: {
      date: '2001-04-11',
      slot: '1',
    },
  };
});

describe('src/components/fragments/InstallationSchedule', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InstallationSchedule />);
    expect(tree).toMatchSnapshot();
  });

  test('render isLoading true', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: { d: true }, schedule: '' }));

    const result = InstallationSchedule(InstallationSchedule.defaultProps);
    expect(result.props.children[1].props.children[0].props.className).toBe('loading');
  });

  test('render no data', () => {
    useSelector.mockImplementationOnce(() => ({ isLoading: { d: false }, schedule: '' }));

    const result = InstallationSchedule(InstallationSchedule.defaultProps);
    expect(result.props.className).toBe(undefined);
  });
});
