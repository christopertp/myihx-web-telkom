import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import PersonalDataSummary, { Confirm, Summary } from '../PersonalDataSummary';

const store = { form: '', photos: '', timeInSeconds: 0 };

useSelector.mockImplementation(fn => {
  fn({});
  return store;
});

describe('src/components/fragments/PersonalDataSummary', () => {
  test('render', () => {
    PersonalDataSummary.defaultProps.fetchDocument();
    PersonalDataSummary.defaultProps.setPhoto();
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PersonalDataSummary />);
    expect(tree).toMatchSnapshot();
  });

  test('loading state & page confirm', () => {
    useParams.mockImplementationOnce(() => ({ page: 'confirm' }));
    useSelector.mockImplementationOnce(() => ({ form: '', isLoading: true, photos: '' }));

    const result = PersonalDataSummary(PersonalDataSummary.defaultProps);
    expect(result.props.children[0].props.title).toBe('Review Documents');
    expect(result.props.children[0].props.children[0]).toBe('');
    expect(result.props.children[0].props.children[1].type).toBe(Confirm);
  });

  test('onClickId & onClose', () => {
    const click = jest.fn();
    useRef.mockImplementationOnce(() => ({ current: { click } }));

    const setModalId = jest.fn();
    const setIdName = jest.fn();
    useState
      .mockImplementationOnce(v => [v, setModalId])
      .mockImplementationOnce(v => [v, setIdName]);

    const result = PersonalDataSummary(PersonalDataSummary.defaultProps);
    const modal = result.props.children[1];

    modal.props.children[0].props.onClick();
    expect(click).toHaveBeenCalled();
    expect(setIdName).toHaveBeenCalledWith('e-KTP');

    modal.props.onClose();
    expect(setModalId).toHaveBeenCalledWith(false);

    result.props.children[0].props.children[1].props.onClickCard('name')();
    expect(setIdName).toHaveBeenCalledWith('name');
  });

  test('onClickCard & onChangeFile', () => {
    const push = jest.fn();
    useHistory.mockImplementationOnce(() => ({ push }));

    const setModalId = jest.fn();
    useState.mockImplementationOnce(v => [v, setModalId]);

    const setPhoto = jest.fn();
    const result = PersonalDataSummary({ setPhoto, fetchDocument: jest.fn() });

    result.props.children[0].props.children[1].props.onClickCard('id')();
    expect(setModalId).toHaveBeenCalledWith(true);

    const files = ['file'];
    result.props.children[3].props.onChange({ target: { files } });
    expect(setPhoto).toHaveBeenCalledWith('file');
    expect(push).toHaveBeenCalledWith('/personal-data/');
  });

  test('Confirm', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Confirm onClickCard={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });

  test('Confirm onClick and submit/error state', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    const newStore = { fetchConfirm: jest.fn(), isLoading: true, message: 'error' };
    useSelector.mockImplementationOnce(() => ({ ...store, ...newStore }));

    const result = Confirm({ onClickCard: jest.fn() });
    expect(result.props.children[7].props.children).toBe('error');
    expect(result.props.children[8].props.children.type).toBe(Spinner);

    result.props.children[8].props.onClick();
    expect(dispatch).toHaveBeenCalled();
  });

  test('Summary', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Summary onClickCard={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });

  test('Summary invalid state', () => {
    const photos = { id: 'id', selfie: 'selfie', sign: 'sign' };
    useSelector.mockImplementationOnce(() => ({ invalid: 'error', photos }));

    const result = Summary({ onClickCard: jest.fn() });
    expect(result.props.children[1].props.children).toBe('error');
  });

  test('Summary loading state & done state', () => {
    const photos = { id: 'id', selfie: 'selfie', sign: 'sign' };
    useSelector.mockImplementationOnce(() => ({ isLoading: true, photos }));

    const onClickCard = jest.fn();
    const result = Summary({ onClickCard });

    const spinner = result.props.children[0].props.children[1][0].props.children[2];
    expect(spinner.type).toBe(Spinner);

    useSelector.mockImplementationOnce(() => ({ isLoading: false, photos }));
    const result2 = Summary({ onClickCard });
    const done = result2.props.children[0].props.children[1][0].props.children[2];
    expect(done.props.alt).toBe('done');
  });
});
