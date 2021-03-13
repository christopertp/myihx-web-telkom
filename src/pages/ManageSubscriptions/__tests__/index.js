import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import ManageSubscriptions, { Menu } from '../ManageSubscriptions';
import ManageSubscriptionsMovin from '../../../components/fragments/ManageSubscriptionsMovin';
import ManageSubscriptionsWifiId from '../../../components/fragments/ManageSubscriptionsWifiId';

jest.mock('../actions', () => ({
  fetchData: jest.fn(),
  fetchSubmit: jest.fn(),
}));

const subscriptions = [
  {
    type: 'WIFI_ID',
    name: 'Wifi.idseamless',
    description: 'Managewifi.idaccount',
    icon: 'http://minio-myihx-dev-myihx-dev.vsan-apps.playcourt.id/assets/icons/ic_usage_wifi.png',
  },
];
useSelector.mockImplementation((fn) => {
  fn({});
  return {
    isLoading: {},
    subscriptions,
  };
});

describe('src/pages/ManageSubscriptions', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ManageSubscriptions />);
    expect(tree).toMatchSnapshot();
  });

  test('Menu', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Menu {...subscriptions[0]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading state', () => {
    useSelector.mockImplementation(() => ({
      subscriptions: [],
      isLoading: { d: true },
    }));
    const result = Menu();
    const { children } = result.props;
    expect(children.props.children[0].type).toBe('span');
    expect(children.props.children[0].props.className).toBe('loading');
  });

  test('render with no data', () => {
    const dispatch = jest.fn();
    useEffect.mockImplementationOnce((fn) => fn());
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation(() => ({
      subscriptions: [],
      message: 'Data not found',
      isLoading: { d: false },
    }));
    const result = Menu();
    const { children } = result.props;
    expect(children.props.children[1].props.children).toBe('Data not found');
    expect(dispatch).toHaveBeenCalled();
  });

  test('render subroutes',() => {
    useParams.mockImplementationOnce(() => ({ page:'movin' }));
    const result1 = ManageSubscriptions();
    expect(result1.props.children.type).toBe(ManageSubscriptionsMovin);

    useParams.mockImplementationOnce(() => ({ page:'wifi-id' }));
    const result2 = ManageSubscriptions();
    expect(result2.props.children.type).toBe(ManageSubscriptionsWifiId);
  });
});
