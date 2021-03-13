import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import OrderWifiExtender, { Confirm, Otp, Success } from '../OrderWifiExtender';

describe('src/components/fragments/OrderWifiExtender', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<OrderWifiExtender />);
    expect(tree).toMatchSnapshot();
  });

  test('Confirm', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Confirm />);
    expect(tree).toMatchSnapshot();
  });

  test('Otp', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Otp />);
    expect(tree).toMatchSnapshot();
  });

  test('Success', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Success />);
    expect(tree).toMatchSnapshot();
  });
});
