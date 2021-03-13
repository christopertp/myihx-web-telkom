import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { useSelector } from 'react-redux';
import Spinner from '../../Spinner';
import StickyPrice from '../StickyPrice';

delete global.addEventListener;
global.addEventListener = jest.fn((_, f) => f());

delete global.removeEventListener;
global.removeEventListener = jest.fn();

jest.mock('../../../../utils/unit', () => ({
  remToPx: () => 100,
}));

jest.mock('../styles.scoped.css', () => ({
  appear: 'appear',
}));

describe('src/components/elements/StickyPrice', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StickyPrice />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading subscribe', () => {
    const isLoading = { data: true, submit: true };
    useSelector.mockImplementationOnce(() => ({ data: {}, isLoading }));
    const result = StickyPrice({ isLoading });
    expect(result.props.children[2].props.children.type).toBe(Spinner);
  });

  test('onScroll and on unmout', () => {
    useEffect.mockImplementationOnce(f => f()());

    const setAppear = jest.fn();
    useState.mockImplementationOnce(() => ['', setAppear]);

    document.getElementsByTagName = () => [{ scrollTop: 200 }];

    StickyPrice(StickyPrice.defaultProps);
    expect(setAppear).toHaveBeenCalledWith('appear');
    expect(global.removeEventListener).toHaveBeenCalled();
  });
});
