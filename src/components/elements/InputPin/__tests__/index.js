import React, { useState, useRef } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import InputPin from '../InputPin';

const setV = jest.fn();
const focus = jest.fn();

useRef.mockImplementation(() => ({
  current: {
    childNodes: Array(1).fill({ focus }),
  },
}));

useState.mockImplementation(v => [v, setV]);

describe('src/components/elements/InputPin', () => {
  test('render', () => {
    InputPin.defaultProps.onSubmit();
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InputPin />);
    expect(tree).toMatchSnapshot();
  });

  test('render error, onFocus, onChange, onKeyUp', () => {
    const onSubmit = jest.fn();
    const props = { ...InputPin.defaultProps, error: 'error', onSubmit };

    useRef.mockImplementationOnce(() => ({
      current: {
        childNodes: Array(InputPin.defaultProps.length).fill({ focus }),
      },
    }));

    const result = InputPin(props);
    expect(result.props.children[1].props.children).toBe('error');

    const input = result.props.children[0][0];
    input.props.onFocus({ target: { value: 'tes' } });
    input.props.onFocus({ target: {} });
    expect(setV).toHaveBeenCalledTimes(1);

    const ev1 = { target: { value: 'a' } };
    expect(input.props.onChange(ev1)).toBe(undefined);
    expect(input.props.onKeyUp(ev1)).toBe(undefined);

    const ev2 = { target: { value: '9' } };
    input.props.onChange(ev2);
    expect(setV).toHaveBeenCalledTimes(2);
    expect(focus).toHaveBeenCalled();

    result.props.children[0][5].props.onChange(ev2);
    expect(onSubmit).toHaveBeenCalled();

    const ev3 = { key: 'Backspace' };
    result.props.children[0][3].props.onKeyUp(ev3);
    expect(focus).toHaveBeenCalled();
  });
});
