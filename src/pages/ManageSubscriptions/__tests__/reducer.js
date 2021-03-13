import { DATA_FETCHED, LOADING, FAILED } from '../constants';
import reducer from '../reducer';

describe('src/pages/ManageSubscriptions/reducer', () => {
  test('case DATA_FETCHED', () => {
    const dataMock = {
      subscriptions: [
        {
          type: 'WIFI_ID',
          name: 'Wifi.idseamless',
          description: 'Managewifi.idaccount',
          icon:
            'http://minio-myihx-dev-myihx-dev.vsan-apps.playcourt.id/assets/icons/ic_usage_wifi.png',
        },
      ],
    };
    const result = reducer({}, { type: DATA_FETCHED, data: { ...dataMock }, key: 'd' });
    expect(result.isLoading.d).toBe(false);
    expect(result.subscriptions).toBe(dataMock.subscriptions);
    expect(result.message).toBe('');
  });

  test('case FAILED', () => {
    const result = reducer({}, { type: FAILED, message: 'failed', key: 'd' });
    expect(result.isLoading.d).toBe(false);
    expect(result.message).not.toBe('');
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: true, key: 'd' });
    expect(result.isLoading.d).toBe(true);
  });

  test('case default', () => {
    const result = reducer();
    expect(result.isLoading.d).toBe(false);
    expect(result.isLoading.s).toBe(false);
    expect(result.message).toBe('');
    expect(result.movin).toStrictEqual([]);
    expect(result.subscriptions).toStrictEqual([]);
    expect(result.wifiId).toStrictEqual({ deviceList: [], guide: [], username: '', password: '' });
  });
});
