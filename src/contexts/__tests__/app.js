import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import Context from '../app';

const add = jest.fn();
const remove = jest.fn();
const scrollTo = jest.fn();
document.getElementsByClassName = () => [{
  classList: { add, remove },
}];
document.getElementsByTagName = () => [{
  classList: { add, remove },
  scrollTo,
}];
global.setTimeout = jest.fn(fn => fn());

useSelector.mockImplementation(fn => {
  fn({});
  return{ message: '' };
});

describe('src/contexts/app', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Context />);
    expect(tree).toMatchSnapshot();
  });

  test('close modal & add modal class', () => {
    const setModal = jest.fn();
    useState.mockImplementationOnce(() => ['modal', setModal]);
    const ev1 = { currentTarget: 'tes', target: 'tes' };
    const ev2 = { currentTarget: '', target: 'tes' };
    const result1 = Context(Context.defaultProps);
    result1.props.children[1].props.onClick(ev1);
    expect(setModal).toHaveBeenCalledWith(null);
    result1.props.children[1].props.onClick(ev2);
    expect(setModal).toHaveBeenCalledTimes(2);
    expect(add).toHaveBeenCalledWith('modal-open');
  });

  test('set notif & overlay open', () => {
    const setNotif = jest.fn();

    useLocation.mockImplementationOnce(() => ({
      state: { notif: 'tes' },
    }));

    useSelector.mockImplementationOnce(() => ({ message: 'OK' }));

    useState
      .mockImplementationOnce(v => [v, jest.fn()])
      .mockImplementationOnce(v => [v, setNotif])
      .mockImplementationOnce(() => [true, jest.fn()]);

    const result = Context(Context.defaultProps);
    expect(setNotif).toHaveBeenCalledWith('tes');
    expect(setNotif).toHaveBeenCalledWith('Thanks for your feedback!');
    expect(result.props.children[2].props.className).toBe('overlay');
  });

  test('set prevNotif', () => {
    const setPrevNotif = jest.fn();

    useState
      .mockImplementationOnce(v => [v, jest.fn()])
      .mockImplementationOnce(() => ['notif', jest.fn()])
      .mockImplementationOnce(v => [v, jest.fn()])
      .mockImplementationOnce(() => ['', setPrevNotif]);

    Context(Context.defaultProps);
    expect(add).toHaveBeenCalledWith('active');
    expect(setPrevNotif).toHaveBeenCalledWith('notif');
    expect(global.setTimeout).toHaveBeenCalledTimes(2);

    useState
      .mockImplementationOnce(v => [v, jest.fn()])
      .mockImplementationOnce(() => ['', jest.fn()])
      .mockImplementationOnce(v => [v, jest.fn()])
      .mockImplementationOnce(() => ['prev-notif', setPrevNotif]);

    Context(Context.defaultProps);
    expect(setPrevNotif).toHaveBeenCalledWith('');
  });
});
