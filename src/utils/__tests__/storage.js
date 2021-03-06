import { set } from 'mockdate';
import * as storage from '../storage';

delete window.localStorage;
window.localStorage = {};

describe('src/utils/storage', () => {
  test('setToken', () => {
    window.localStorage.setItem = jest.fn();
    storage.setToken('tes');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('myihx_web_access_token', 'tes');
  });

  test('getToken', () => {
    window.localStorage.getItem = jest.fn(() => 'tes');
    expect(storage.getToken()).toBe('tes');
  });

  test('clearStorages', () => {
    window.localStorage.removeItem = jest.fn();
    storage.clearStorages();
    expect(window.localStorage.removeItem).toHaveBeenNthCalledWith(1, 'myihx_web_access_token');
    expect(window.localStorage.removeItem).toHaveBeenNthCalledWith(2, 'myihx_web_expire_time');
    expect(window.localStorage.removeItem).toHaveBeenNthCalledWith(3, 'myihx_web_user_data');
    expect(window.localStorage.removeItem).toHaveBeenNthCalledWith(4, 'myihx_web_guest_address');
  });

  test('setExpireTime', () => {
    window.localStorage.setItem = jest.fn();
    storage.setExpireTime(1);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('myihx_web_expire_time', 1000);
  });

  test('checkExpireTime', () => {
    window.localStorage.getItem = jest.fn(() => {});
    set('2011-01-01');
    expect(storage.checkExpireTime()).toBe(true);
    window.localStorage.getItem = jest.fn(() => 100);
    expect(storage.checkExpireTime()).toBe(true);
  });

  test('setUserData', () => {
    window.localStorage.setItem = jest.fn();
    const data = { tes: 'tes' };
    storage.setUserData(data);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('myihx_web_user_data', JSON.stringify(data));
  });

  test('getUserData', () => {
    window.localStorage.getItem = jest.fn(() => JSON.stringify(null));
    expect(storage.getUserData()).toBe('');
    window.localStorage.getItem = jest.fn(() => JSON.stringify({ tes: 'tes' }));
    expect(storage.getUserData().tes).toBe('tes');
  });

  test('setGuestAddress', () => {
    window.localStorage.setItem = jest.fn();
    const data = { tes: 'tes' };
    storage.setGuestAddress(data);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('myihx_web_guest_address', JSON.stringify(data));
  });

  test('getGuestAddress', () => {
    window.localStorage.getItem = jest.fn(() => JSON.stringify(null));
    expect(storage.getGuestAddress()).toBe('');
    window.localStorage.getItem = jest.fn(() => JSON.stringify({ tes: 'tes' }));
    expect(storage.getGuestAddress().tes).toBe('tes');
  });

  test('clearGuestAddress', () => {
    window.localStorage.removeItem = jest.fn();
    storage.clearGuestAddress();
    expect(window.localStorage.removeItem).toHaveBeenCalledWith('myihx_web_guest_address');
  });

  test('setSessionTime', () => {
    window.localStorage.setItem = jest.fn();
    storage.setSessionTime(100);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('myihx_web_session_time', 100);
  });

  test('getSessionTime', () => {
    window.localStorage.getItem = jest.fn();
    expect(storage.getSessionTime()).toBe(0);
    window.localStorage.getItem = jest.fn(() => 100);
    expect(storage.getSessionTime()).toBe(100);
  });
});
