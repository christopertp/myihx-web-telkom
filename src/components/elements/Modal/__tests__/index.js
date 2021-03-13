import React, { useEffect, useContext, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Modal, { Content } from '../Modal';

const setModal = jest.fn();
useContext.mockImplementation(() => ({ modal: 'tes', setModal }));

describe('src/components/elements/Modal', () => {
  test('render', () => {
    useEffect.mockImplementationOnce(f => f()());

    Modal(Modal.defaultProps);
    Modal.defaultProps.onClose();
    expect(setModal).toHaveBeenCalledWith(null);

    Modal({ ...Modal.defaultProps, open: true });
    expect(setModal).toHaveBeenCalledWith(<Content className="" />);

    const setModal1 = jest.fn();
    useState.mockImplementationOnce(v => [!v, setModal1]);
    Modal(Modal.defaultProps);
    expect(setModal1).toHaveBeenCalledWith('tes');

    const setModal2 = jest.fn();
    const onClose = jest.fn();
    useContext.mockImplementationOnce(() => ({ modal: '', setModal }));
    useState.mockImplementationOnce(v => [!v, setModal2]);
    Modal({ ...Modal.defaultProps, onClose });
    expect(onClose).toHaveBeenCalled();
    expect(setModal2).toHaveBeenCalledWith('');
  });

  test('Content', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Content />);
    expect(tree).toMatchSnapshot();
  });
});
