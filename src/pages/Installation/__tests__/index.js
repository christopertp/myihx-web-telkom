import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import Installation, { Detail, GoodToKnow, Package, RescheduleSuccess } from '../Installation';

jest.mock('../actions', () => ({
  fetchInstallationDetail: jest.fn(),
  fetchNps: jest.fn(),
}));

useSelector.mockImplementation(fn => {
  fn({});
  return { isLoading: {
    d:false,
    n: false,
    s: false,
  } };
});

describe('src/pages/Installation', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Installation />);
    expect(tree).toMatchSnapshot();
  });

  test('render subroute', () => {
    const replace = jest.fn();
    useHistory.mockImplementationOnce(() => ({ replace }));
    useParams.mockImplementationOnce(() => ({ page: 'anything' }));

    const result = Installation();
    expect(replace).toHaveBeenCalledWith('/installation');
    expect(result.props.children.type).toBe(Detail);
  });

  test('render subroute reschedule success', () => {
    useParams.mockImplementationOnce(() => ({ page: 'reschedule-success' }));

    const result = Installation();

    expect(result.props.children.type).toBe(RescheduleSuccess);
  });

  test('Detail', () => {
    useSelector.mockImplementationOnce(() => ({
      isLoading: { n: false },
      questionnaires: { 'NPS-TECH-RATING': {} },
    }));

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('Detail reschedule & error modal', () => {
    const setModal = jest.fn();

    useSelector.mockImplementationOnce(() => ({
      isLoading: {},
      message: '404',
      questionnaires: { 'NPS-TECH-RATING': {} },
      technician: 'test'
    }));
    useState.mockImplementationOnce(() => ['', setModal]);

    const result = Detail();
    expect(setModal).toHaveBeenCalledWith('404');

    result.props.children[0].props.children[0].props.onClick();
    expect(setModal).toHaveBeenCalledWith('reschedule');

    result.props.children[1].props.onClose();
    result.props.children[2].props.onClose();
    expect(setModal).toHaveBeenCalledWith('');
  });

  test('Detail max reschedule', () => {
    const setModal = jest.fn();

    useSelector.mockImplementationOnce(() => ({
      isLoading: { s: false },
      questionnaires: { 'NPS-TECH-RATING': {} },
      rescheduleAttempt: 2 }));
    useState.mockImplementationOnce(() => ['', setModal]);

    const result = Detail();

    result.props.children[0].props.children[0].props.onClick();
    expect(setModal).toHaveBeenCalledWith('max-reschedule');
  });

  test('GoodToKnow', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<GoodToKnow />);
    expect(tree).toMatchSnapshot();
  });

  test('Package', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Package />);
    expect(tree).toMatchSnapshot();
  });

  test('Package Open', () => {
    const setOpen = jest.fn();
    delete global.getComputedStyle;
    global.getComputedStyle = () => ({
      getPropertyValue: () => '10px',
    });

    const children = [{ offsetHeight: 10 }];
    const current = { children };

    useRef.mockImplementationOnce(() => ({ current }));
    useState.mockImplementationOnce(() => [true, setOpen]);
    useSelector.mockImplementationOnce(() => ({
      isLoading: { d: false },
      technician: 'test'
    }));

    const result = Package();
    expect(result.props.children[0].props.style.height).toBe(30);

    result.props.children[1].props.onClick();
    expect(setOpen).toHaveBeenCalled();
  });

  test('RescheduleSuccess', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RescheduleSuccess />);
    expect(tree).toMatchSnapshot();
  });
});
