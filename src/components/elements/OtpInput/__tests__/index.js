import React, { useState, useRef } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import OtpInput from '../OtpInput';

const setV = jest.fn();
const focus = jest.fn();
useState.mockImplementation(v => [v, setV]);
useRef.mockImplementation(() => ({
  current: {
    childNodes: [{ focus }, { focus }, { focus }, { focus }],
  },
}));

describe('src/components/elements/OtpInput', () => {
  test('render', () => {
    OtpInput.defaultProps.onSubmit();
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<OtpInput />);
    expect(tree).toMatchSnapshot();
  });

  test('render error, onFocus, onChange, onKeyUp', () => {
    const onSubmit = jest.fn();
    const props = { ...OtpInput.defaultProps, error: 'error', onSubmit };
    const result = OtpInput(props);
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

    result.props.children[0][3].props.onChange(ev2);
    expect(onSubmit).toHaveBeenCalled();

    const ev3 = { key: 'Backspace' };
    result.props.children[0][3].props.onKeyUp(ev3);
    expect(focus).toHaveBeenCalled();
  });
});
