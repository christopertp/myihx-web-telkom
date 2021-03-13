import React, { useEffect, useContext, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../components/elements/Spinner';
import PersonalData, { ReviewId, ReviewSelfieSign, Verify, usePhoto } from '../PersonalData';

jest.mock('../actions', () => ({
  fetchDocument: jest.fn(),
  fetchUpload: jest.fn(),
}));

useSelector.mockImplementation(fn => {
  fn({});
  return { photos: '' };
});

describe('src/pages/PersonalData', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PersonalData />);
    expect(tree).toMatchSnapshot();
  });

  test('render subbroutes', () => {
    const replace = jest.fn();
    useHistory.mockImplementationOnce(() => ({ replace }));

    useParams.mockImplementationOnce(() => ({ page: 'sim' }));
    const result1 = PersonalData();
    expect(result1.props.children.type).toBe(ReviewId);
    expect(replace).toHaveBeenCalledWith('/personal-data');

    useParams.mockImplementationOnce(() => ({ page: 'sign' }));
    const result2 = PersonalData();
    expect(result2.props.children.type).toBe(ReviewSelfieSign);

    useParams.mockImplementationOnce(() => ({ page: 'verify' }));
    const result3 = PersonalData();
    expect(result3.props.children.type).toBe(Verify);
  });

  test('ReviewId', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ReviewId />);
    expect(tree).toMatchSnapshot();
  });

  test('ReviewId onSubmit & onUnmout', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    const setPhoto = jest.fn();
    useState.mockImplementationOnce(() => ['preview', jest.fn()]);
    useContext.mockImplementationOnce(() => ({ setPhoto }));

    useEffect.mockImplementationOnce(fn => fn()).mockImplementationOnce(fn => fn()());
    useParams.mockImplementationOnce(() => ({ page: '' }));

    const result = ReviewId();
    result.props.children[1].props.onSubmit({ test: 'test' });
    expect(dispatch).toHaveBeenCalled();
    expect(setPhoto).toHaveBeenCalledWith(null);
  });

  test('ReviewSelfieSign', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ReviewSelfieSign />);
    expect(tree).toMatchSnapshot();
  });

  test('ReviewSelfieSign selfie page, loading/error state & onSubmit', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    useParams.mockImplementationOnce(() => ({ page: 'selfie' }));
    useSelector.mockImplementationOnce(() => ({ isLoading: true, message: 'error' }));

    const result = ReviewSelfieSign();
    expect(result.props.title).toBe('Review Photo');
    expect(result.props.children[1].props.children).toBe('error');

    const button = result.props.children[2].props.children[1];
    expect(button.props.children.type).toBe(Spinner);
    button.props.onClick();
    expect(dispatch).toHaveBeenCalled();
  });

  test('Verify', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Verify />);
    expect(tree).toMatchSnapshot();
  });

  test('usePhoto', () => {
    const click = jest.fn();
    useRef.mockImplementationOnce(() => ({ current: { click } }));

    const setPreview = jest.fn();
    useState.mockImplementationOnce(() => ['preview', setPreview]);

    delete global.FileReader;
    const readAsDataURL = jest.fn();
    const reader = { readAsDataURL };
    global.FileReader = () => reader;

    const setPhoto = jest.fn();
    const { onChangeFile, onRetake } = usePhoto('photo', setPhoto);

    expect(readAsDataURL).toHaveBeenCalledWith('photo');

    reader.onload({ target: { result: 'res' } });
    expect(setPreview).toHaveBeenCalledWith('res');

    onRetake();
    expect(click).toHaveBeenCalled();

    const files = ['file'];
    onChangeFile({ target: { files } });
    expect(setPhoto).toHaveBeenCalledWith('file');
  });
});
