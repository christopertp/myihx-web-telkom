import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import ManageSubscriptionsWifiId, {
  Overlay,
  LoginInformation,
  Devices,
  HowToWifiId,
} from '../ManageSubscriptionsWifiId';

useSelector.mockImplementation((fn) => {
  fn({});
  return {
    wifiId: {
      username: '',
      password: '',
      deviceList: [],
      guide: [],
    },
    isLoading: { d: false, s: false },
    fetchData: jest.fn(),
    message: '',
  };
});

describe('src/components/fragments/ManageSubscriptionsWifiId', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ManageSubscriptionsWifiId />);
    expect(tree).toMatchSnapshot();

    const result = ManageSubscriptionsWifiId();
    const { children } = result.props;
    children.props.children[3].props.onClick();

  });

  test('render LoginInformation', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LoginInformation />);
    expect(tree).toMatchSnapshot();

    const dispatch = jest.fn();
    const setShowPassword = jest.fn();
    const setChangePassword = jest.fn();
    useState
      .mockImplementationOnce((v) => [v, setShowPassword])
      .mockImplementationOnce((v) => [v, setChangePassword]);
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementationOnce(() => ({
      message: '',
      fetchData: jest.fn(),
      fetchSubmit: jest.fn(),
      isLoading: { d: true },
      wifiId: {},
    }));

    const result = LoginInformation();
    expect(result.props.children[1].props.children[0].props.children[1].props.className).toBe(
      'loading',
    );

    result.props.children[1].props.children[1].props.children[2].props.onClick();
    expect(setShowPassword).toHaveBeenNthCalledWith(1, true);

    result.props.children[1].props.children[1].props.children[3].props.onClick();
    expect(setChangePassword).toHaveBeenNthCalledWith(1, true);

    result.props.children[2].props.onClose();
    expect(setChangePassword).toHaveBeenNthCalledWith(2, false);

    result.props.children[2].props.children.props.handleCancel();
    expect(setChangePassword).toHaveBeenNthCalledWith(3, false);

    result.props.children[2].props.children.props.onSubmit('testpassword');
    expect(setChangePassword).toHaveBeenNthCalledWith(4, false);
  });

  test('render LoginInformation with error', () => {
    const dispatch = jest.fn();
    const setShowPassword = jest.fn();
    const setChangePassword = jest.fn();
    useState
      .mockImplementationOnce(() => [true, setShowPassword])
      .mockImplementationOnce(() => [true, setChangePassword]);
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementationOnce(() => ({
      message: 'test error',
      fetchData: jest.fn(),
      fetchSubmit: jest.fn(),
      isLoading: { d: false },
      wifiId: false,
    }));

    const result = LoginInformation();
    expect(result.props.children[1].props.children[0].props.children[1]).toBe('');
  });

  test('render Devices', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Devices />);
    expect(tree).toMatchSnapshot();

    const dispatch = jest.fn();
    const setChangeDeviceName = jest.fn();
    const setConfirmRemoveDevice = jest.fn();
    useState
      .mockImplementationOnce((v) => [v, setConfirmRemoveDevice])
      .mockImplementationOnce((v) => [v, setChangeDeviceName]);
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementationOnce(() => ({
      message: '',
      fetchData: jest.fn(),
      fetchSubmit: jest.fn(),
      isLoading: { d: true },
      wifiId: {
        deviceList: [],
      },
    }));

    const result = Devices();

    expect(result.props.children[1].length).toBe(3);
    expect(result.props.children[1][0].props.className).toBe('loading');
  });

  test('render Devices with data', () => {
    const dispatch = jest.fn();
    const setChangeDeviceName = jest.fn();
    const setConfirmRemoveDevice = jest.fn();
    useState
      .mockImplementationOnce((v) => [v, setConfirmRemoveDevice])
      .mockImplementationOnce((v) => [v, setChangeDeviceName]);
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementationOnce(() => ({
      message: '',
      fetchData: jest.fn(),
      fetchSubmit: jest.fn(),
      isLoading: { d: false },
      wifiId: {
        deviceList: [
          {
            deviceName: 'tesAja8',
            crmId: 'SEAMLESS1',
            startDate: '18 Jun 2020',
          },
        ],
      },
    }));

    const result = Devices();
    const { children } = result.props;
    expect(children[1][0].props.children[1].props.children).toBe('tesAja8');
    children[1][0].props.children[3].props.children[1]
      .props.children.props.children[0].props.onClick();
    expect(setChangeDeviceName).toHaveBeenNthCalledWith(1, 'SEAMLESS1');

    children[1][0].props.children[3].props.children[1]
      .props.children.props.children[1].props.onClick();
    expect(setConfirmRemoveDevice).toHaveBeenNthCalledWith(1, true);

    result.props.children[1][0].props.children[3].props.children[2].props.onClose();
    expect(setChangeDeviceName).toHaveBeenNthCalledWith(2,'');

    result.props.children[1][0].props.children[3].props.children[2]
      .props.children.props.handleCancel();
    expect(setChangeDeviceName).toHaveBeenNthCalledWith(2,'');

    result.props.children[1][0].props.children[3].props.children[2]
      .props.children.props.onSubmit('tesAja8');
    expect(setChangeDeviceName).toHaveBeenNthCalledWith(2,'');

    result.props.children[1][0].props.children[3].props.children[3].props.onClose();
    expect(setConfirmRemoveDevice).toHaveBeenNthCalledWith(2,false);

    result.props.children[1][0].props.children[3].props.children[3].props.onRefuse();
    expect(setConfirmRemoveDevice).toHaveBeenNthCalledWith(2,false);

    result.props.children[1][0].props.children[3].props.children[3].props.onAccept();
  });

  test('render HowToWifiId', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<HowToWifiId />);

    expect(tree).toMatchSnapshot();
    const dispatch = jest.fn();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementationOnce(() => ({
      message: '',
      fetchData: jest.fn(),
      fetchSubmit: jest.fn(),
      isLoading: { d: true },
      wifiId: {
        guide: [],
      },
    }));

    const result = HowToWifiId();
    expect(result.props.children[1].props.children[0].props.className).toBe('loading');
  });

  test('render HowToWifiId with data', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementationOnce(() => ({
      message: '',
      fetchData: jest.fn(),
      fetchSubmit: jest.fn(),
      isLoading: { d: false },
      wifiId: {
        guide: [
          {
            'detailId': '46d05732-5850-4abe-b526-45a6e50a5b81',
            'name': 'howToUse',
            'id': {
              'header': 'test header',
              'description': 'test desc',
              'steps': [
                'test steps'
              ]
            },
            'en': {
              'header': 'test header',
              'description': 'test desc',
              'steps': []
            }
          },
        ],
      },
    }));

    const result = HowToWifiId();
    expect(result.props.children[0].props.children[0].props.children).toBe('test header');
    expect(result.props.children[0].props.children[1]
      .props.children.props.children[0].key).toBe(null);
    expect(result.props.children[0].props.children[1]
      .props.children.props.children[2][0].props.children).toBe('test steps');
  });

  test('Overlay', () => {
    const setOverlay = jest.fn();
    useContext.mockImplementationOnce(() => ({ setOverlay }));
    Overlay();
    expect(setOverlay).toHaveBeenCalledWith(false);
  });
});
