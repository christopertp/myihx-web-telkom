import React from 'react';
import { moduleHotAccept } from '../';
import { render } from 'react-dom';
import configureStore from '../store/configureStore';

const mockComponent = (name, props) => <div className={name} {...props} />;

jest.mock('../App', () => ({
  __esModule: true,
  default: props => mockComponent('App', props),
}));
jest.mock('../store/configureStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
  history: {},
}));
jest.mock('react-dom');
jest.mock('typeface-ubuntu', () => null);
jest.mock('react-dom');
jest.mock('../favicon.ico', () => null);

describe('src/index', () => {
  test('render', () => {
    moduleHotAccept({ hot: { accept: (_, cb) => cb() } });
    expect(configureStore).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenCalledTimes(2);
  });
});
