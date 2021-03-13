import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import NotificationSettings from '../NotificationSettings';

describe('src/pages/NotificationSettings', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<NotificationSettings />);
    expect(tree).toMatchSnapshot();
  });

  test('onAccept, onRefuse, onClick, onSubmit', () => {
    const setConfirmation = jest.fn();
    const setNotification = jest.fn();
    const push = jest.fn();
    useState
      .mockImplementationOnce((v) => [v, setNotification])
      .mockImplementationOnce((v) => [v, setConfirmation]);

    useHistory.mockImplementationOnce(() => ({ push }));

    const res = NotificationSettings();
    const [ul, modal] = res.props.children;
    modal.props.onAccept();
    expect(setConfirmation).toHaveBeenNthCalledWith(1, '');
    expect(setNotification).toHaveBeenNthCalledWith(1, {
      '': true,
      'Account Changes': true,
      'Bill Reminder': true,
      'New Purchase': true,
      Promotions: true,
    });

    modal.props.onRefuse();
    expect(setConfirmation).toHaveBeenNthCalledWith(2, '');

    ul.props.children[0].props.children[1].props.inputProps.onChange();
    expect(setConfirmation).toHaveBeenNthCalledWith(3, 'New Purchase');

    ul.props.children[4].props.children.props.onClick();
    expect(push).toHaveBeenNthCalledWith(1, '/profile');
  });
});
