import React, { useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ProfileUserMenu, { ModalLogOut } from '../ProfileUserMenu';

describe('src/components/fragments/ProfileUserMenu', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProfileUserMenu />);
    expect(tree).toMatchSnapshot();

    const setModal = jest.fn();
    useState.mockImplementationOnce(() => [false, setModal]);

    const result = ProfileUserMenu({
      ...ProfileUserMenu.defaultProps,
    });
    result.props.children[0].props.children[20].props.onClick();
    const result2 = ProfileUserMenu({
      ...ProfileUserMenu.defaultProps,
    });
    result2.props.children[1].props.onClose();
    expect(setModal).toHaveBeenCalled();
  });

  test('ModalLogout', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalLogOut />);
    expect(tree).toMatchSnapshot();

    ModalLogOut.defaultProps.onClose();
    const result = ModalLogOut({
      ...ModalLogOut.defaultProps,
    });
    result.props.children[2].props.children[0].props.onClick();
    expect(result.props.children[2].props.children[0].props.variant).toBe('bordered');
  });

  test('Change language to indonesia', () => {
    const setLanguage = jest.fn();
    const setConfirmation = jest.fn();
    const setModal = jest.fn();

    useState
      .mockImplementationOnce((v) => [v, setModal])
      .mockImplementationOnce(() => ['ID', setLanguage])
      .mockImplementationOnce((v) => [v, setConfirmation]);

    const res = ProfileUserMenu();
    const { children } = res.props;

    children[0].props.children[17].props.children[1].props.inputProps.onChange();
    expect(setConfirmation).toHaveBeenNthCalledWith(1, true);

    children[2].props.onAccept();
    expect(setLanguage).toHaveBeenNthCalledWith(1, 'EN');
    expect(setConfirmation).toHaveBeenNthCalledWith(2, true);

    expect(children[2].props.title).toBe('Switch language to Bahasa Indonesia');

    children[2].props.onClose();
    expect(setConfirmation).toHaveBeenNthCalledWith(3, false);

    children[2].props.onRefuse();
    expect(setConfirmation).toHaveBeenNthCalledWith(4, false);
  });

  test('Change language to english', () => {
    const setLanguage = jest.fn();
    const setConfirmation = jest.fn();
    const setModal = jest.fn();

    useState
      .mockImplementationOnce((v) => [v, setModal])
      .mockImplementationOnce(() => ['EN', setLanguage])
      .mockImplementationOnce((v) => [v, setConfirmation]);

    const res = ProfileUserMenu();
    const { children } = res.props;

    children[0].props.children[17].props.children[1].props.inputProps.onChange();
    expect(setConfirmation).toHaveBeenNthCalledWith(1, true);

    children[2].props.onAccept();
    expect(setLanguage).toHaveBeenNthCalledWith(1, 'ID');
    expect(setConfirmation).toHaveBeenNthCalledWith(2, true);

    expect(children[2].props.title).toBe('Switch language to English');
  });
});
