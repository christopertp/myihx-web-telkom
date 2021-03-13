import React, { useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AppointmentDate from '../AppointmentDate';

const arrival = [
  { availability: true, data: {}, slot: 'slot-1' },
  { availability: true, data: {}, slot: 'slot-2' },
];
const date = [{ arrival }, { arrival }];

describe('src/components/elements/AppointmentDate', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AppointmentDate date={date} mini />);
    expect(tree).toMatchSnapshot();
    AppointmentDate.defaultProps.setPayload();
  });

  test('loading state', () => {
    const props = { ...AppointmentDate.defaultProps, isLoading: true };
    const result = AppointmentDate(props);
    expect(result.props.children[1].props.children[0].props.className).toBe('loading');
    expect(result.props.children[3].props.children[0].props.className).toBe('loading');
  });

  test('no data state', () => {
    const result = AppointmentDate(AppointmentDate.defaultProps);
    expect(result.props.children[1].props.children[0]).toBe('No date available');
    expect(result.props.children[3].props.children.length).toBe(0);
  });

  test('onChangeArrival', () => {
    const target = { value: '0' };
    const setArrival = jest.fn();
    useState.mockImplementationOnce(() => ['1', setArrival]);

    const setPayload = jest.fn();

    const props = { ...AppointmentDate.defaultProps, date, setPayload };
    const result = AppointmentDate(props);
    const input = result.props.children[3].props.children[0].props.children[0];
    input.props.onChange({ target });
    expect(setArrival).toHaveBeenCalledWith('0');
    expect(setPayload).toHaveBeenCalled();
  });

  test('onChangeDate', () => {
    const target = { value: '0' };
    const setArrival = jest.fn();
    const setSelected = jest.fn();
    useState
      .mockImplementationOnce(() => ['1', setArrival])
      .mockImplementationOnce(() => ['1', setSelected]);

    const setPayload = jest.fn();
    const arrival = [
      '',
      { availability: true, data: {}, slot: 'slot-2' },
    ];
    const arrival2 = [
      { availability: true, data: {}, slot: 'slot-1' },
      { availability: true, data: {}, slot: 'slot-2' },
    ];
    const date = [{ arrival }, { arrival: arrival2 }];

    const props = { ...AppointmentDate.defaultProps, date, setPayload };
    const result = AppointmentDate(props);
    const input = result.props.children[1].props.children[0].props.children[0];
    input.props.onChange({ target });
    expect(setArrival).toHaveBeenNthCalledWith(2, '1');
    expect(setSelected).toHaveBeenNthCalledWith(1, '0');

    input.props.onChange({ target: { value: '1' } });
    expect(setArrival).toHaveBeenNthCalledWith(3, '0');
    expect(setSelected).toHaveBeenNthCalledWith(2, '1');
    expect(setPayload).toHaveBeenCalledTimes(3);
  });
});
