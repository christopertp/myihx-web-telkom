import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import CheckCoverageAddress, { normalizeRtRw, useMappedAddress } from '../CheckCoverageAddress';

const defaultState = {
  cities: [],
  districts: [],
  fetchAddress: () => { },
  isLoading: false,
  message: '',
  provinces: [],
  resetMessage: () => { },
  streets: [],
};

useSelector.mockImplementation(fn => {
  fn({ form: { checkCoverageAddress: '' } });
  return defaultState;
});

describe('src/components/forms/CheckCoverageAddress', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CheckCoverageAddress />);
    CheckCoverageAddress.defaultProps.change();
    CheckCoverageAddress.defaultProps.handleSubmit();
    expect(tree).toMatchSnapshot();
  });

  test('loading & error message', () => {
    useSelector.mockImplementationOnce(() => ({
      ...defaultState,
      message: 'error',
      isLoading: { p: true, submit: true },
    }));
    const result = CheckCoverageAddress(CheckCoverageAddress.defaultProps);
    const formChildren = result.props.children;
    expect(formChildren[5].props.children).toBe('error');
    expect(formChildren[6].props.children.type).toBe(Spinner);
  });

  test('onSearch & useEffect with code', () => {
    useSelector.mockImplementationOnce(() => ({
      ...defaultState,
      districts: [{ id: '1' }],
    }))
      .mockImplementationOnce(() => ({
        cityCode: '1',
        districtCode: '1',
        provinceCode: '1',
      }));
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);
    const result = CheckCoverageAddress(CheckCoverageAddress.defaultProps);
    const formChildren = result.props.children;
    formChildren[0].props.onSearch();
    formChildren[1].props.children[0].props.children.props.onSearch();
    formChildren[1].props.children[1].props.children.props.onSearch();
    formChildren[2].props.onSearch();
    expect(dispatch).toHaveBeenCalledTimes(8);
  });

  test('normalizeRtRw', () => {
    const result1 = normalizeRtRw('0010', '0');
    expect(result1).toBe('001/0');
    const result2 = normalizeRtRw('0010/0', '0');
    expect(result2).toBe('0');
    const result3 = normalizeRtRw('001/0000', '0');
    expect(result3).toBe('0');
    const result4 = normalizeRtRw('a', '0');
    expect(result4).toBe('0');
    const result5 = normalizeRtRw('001/002', '001/00');
    expect(result5).toBe('001/002');
  });

  test('useMappedAddress', () => {
    const setMapData = jest.fn();
    useState.mockImplementationOnce(v => [v, setMapData]);
    const result = useMappedAddress([{ name: 'name', id: 1 }]);
    result[1]();
    expect(result[0].length).toBe(0);
    expect(setMapData).toHaveBeenCalledWith([]);
  });
});
