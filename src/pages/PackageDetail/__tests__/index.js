import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import { getUserData } from '../../../utils/storage';
import PackageDetail, { SliderSection, ModalChannels } from '../PackageDetail';

jest.mock('../../../hooks/useSlider');
jest.mock('../../../utils/storage');

jest.mock('../actions', () => ({
  fetchMostPopularDetail: jest.fn(),
  fetchSubscribe: jest.fn(),
  resetData: jest.fn(),
}));

jest.mock('../styles.scoped.css', () => ({
  appear: 'appear',
  open: 'open',
}));

useSelector.mockImplementation(fn => {
  fn({});
  return {
    isLoading: { data: false },
    data: {
      channelsByCat: { tes: [{}], },
      tes: [{}],
    },
  };
});

const body = {};
document.getElementsByTagName = (tag) => (
  tag === 'body' ? [body] : [{ scrollTop: true }]
);

describe('src/pages/PackageDetail', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PackageDetail />);
    expect(tree).toMatchSnapshot();
  });

  test('render with no data & unmount event', () => {
    const dispatch = jest.fn();
    useEffect.mockImplementationOnce(fn => fn()());
    useDispatch.mockImplementationOnce(() => dispatch);
    useSelector.mockImplementationOnce(() => ({ data: '', isLoading: { data: false } }));
    const result = PackageDetail();
    expect(result.props.children).toBe('Data tidak ditemukan');
    expect(dispatch).toHaveBeenCalled();
  });

  test('onclick, onclose, & onscroll events', () => {
    const setModalLogin = jest.fn();
    const setModalChannel = jest.fn();
    const setModalDetail = jest.fn();
    useState
      .mockImplementationOnce(v => [v, setModalLogin])
      .mockImplementationOnce(v => [v, setModalChannel])
      .mockImplementationOnce(v => [v, setModalDetail]);

    getUserData.mockImplementationOnce(() => false);

    const result = PackageDetail();
    const { children } = result.props;

    children[0].props.onClickDetail();
    expect(setModalDetail).toHaveBeenNthCalledWith(1, true);

    children[1].props.children[0].props.children[1].props.onClick();
    expect(setModalChannel).toHaveBeenNthCalledWith(1, true);

    children[3].props.onClose();
    expect(setModalChannel).toHaveBeenNthCalledWith(2, false);

    children[4].props.onClose();
    expect(setModalLogin).toHaveBeenNthCalledWith(1, false);

    children[5].props.onClose();
    expect(setModalDetail).toHaveBeenNthCalledWith(2, false);

    children[5].props.onClickSubscribe();
    expect(setModalLogin).toHaveBeenNthCalledWith(2, true);

    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    const result2 = PackageDetail();
    result2.props.children[5].props.onClickSubscribe();
    expect(dispatch).toHaveBeenCalled();
  });

  test('onscroll appear and subscribe redirect', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    const result = PackageDetail();
    const { children } = result.props;
    children[5].props.onClickSubscribe();
    expect(dispatch).toHaveBeenCalled();
  });

  test('SliderSection', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SliderSection name="tes" />);
    expect(tree).toMatchSnapshot();
  });

  test('SliderSection loading state & mobile margin', () => {
    window.innerWidth = 360;
    useSelector.mockImplementationOnce(() => ({ isLoading: { data: true } }));
    const result = SliderSection(SliderSection.defaultProps);
    expect(result.props.children.length).toBe(2);
  });

  test('ModalChannels', () => {
    ModalChannels.defaultProps.onClose();
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalChannels />);
    expect(tree).toMatchSnapshot();
  });

  test('ModalChannels carousel opened & onclickopen', () => {
    const channelsByCat = {
      tes1: [{}],
      tes2: [{}],
    };
    const setIdxOpen = jest.fn();
    useState.mockImplementationOnce(() => [1, setIdxOpen]);
    useSelector.mockImplementationOnce(() => ({ data: { channelsByCat } }));
    const result = ModalChannels(ModalChannels.defaultProps);
    result.props.children[1][0].props.children[0].props.onClick();
    result.props.children[1][1].props.children[0].props.onClick();
    expect(setIdxOpen).toHaveBeenNthCalledWith(1, 0);
    expect(setIdxOpen).toHaveBeenNthCalledWith(2, -1);
    expect(result.props.children[1][1].props.children[0].props.children[2].props.className).toBe('open');
  });
});
