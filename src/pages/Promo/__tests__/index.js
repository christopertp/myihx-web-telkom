import React, { useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Promo, { PromoDetail } from '../Promo';

describe('src/pages/Promo', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Promo />);
    expect(tree).toMatchSnapshot();
  });

  test('render promo detail active tab', () => {
    const setActiveTab = jest.fn();
    useState.mockImplementationOnce((v) => [v, setActiveTab]);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PromoDetail />);
    expect(tree).toMatchSnapshot();
  });

  test('render promo detail passive tab', () => {
    const setActiveTab = jest.fn();
    useState.mockImplementationOnce(() => [1, setActiveTab]);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PromoDetail />);
    expect(tree).toMatchSnapshot();
  });
});
