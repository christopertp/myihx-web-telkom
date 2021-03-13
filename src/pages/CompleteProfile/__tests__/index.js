import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import CompleteProfile, { Verify, Progress, Task, typeIdNumber } from '../CompleteProfile';
import Status from '../../../components/fragments/CompleteProfileStatus';
import Spinner from '../../../components/elements/Spinner';
import VerifyEmailForm from '../../../components/forms/CompleteProfileVerifyEmail';
import VerifyIDForm from '../../../components/forms/CompleteProfileVerifyID';
import VerifyLocation from '../../../components/fragments/CompleteProfileVerifyLocation';

useSelector.mockImplementation((fn) => {
  fn({ completeProfile: {} });
  return {
    isLoading: false,
    data: {
      svmLevel: 0,
      completeProfile: false,
      verifiedEmail: false,
      subscribePackage: false,
      verifiedId: false,
      verifiedLocation: false,
    },
    message: '',
  };
});

describe('src/pages/CompleteProfile', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CompleteProfile />);
    expect(tree).toMatchSnapshot();
  });

  test('Verify', () => {
    useSelector.mockImplementationOnce(() => ({
      message: '',
    }));
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Verify />);
    expect(tree).toMatchSnapshot();
  });

  test('Progress', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Progress />);
    expect(tree).toMatchSnapshot();
  });

  test('Task', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Task />);
    expect(tree).toMatchSnapshot();
  });

  test('Task with loading', () => {
    useSelector.mockImplementationOnce(() => ({
      isLoading: true,
      data: {},
    }));
    const result = Task();
    expect(result.props.children[1].props.children[0].type).toBe(Spinner);
  });

  test('Task with data', () => {
    useSelector.mockImplementationOnce(() => ({
      isLoading: false,
      data: {
        svmLevel: 0,
        completeProfile: true,
        verifiedEmail: false,
        subscribePackage: true,
        verifiedId: false,
        verifiedLocation: false,
      },
    }));
    const result1 = Task();
    expect(result1.props.children[1].props.children[0].type).toBe('img');
    expect(result1.props.children[1].props.children[0].props.alt).toBe('done');
  });

  test('Subroutes complete profile', () => {
    useParams.mockImplementationOnce(() => ({ page: 'verify-email' }));
    const result1 = CompleteProfile();
    expect(result1.type).toBe(Verify);

    useParams.mockImplementationOnce(() => ({ page: 'verify-id' }));
    const result2 = CompleteProfile();
    expect(result2.type).toBe(Verify);

    useParams.mockImplementationOnce(() => ({ page: 'success' }));
    const result4 = CompleteProfile();
    expect(result4.type).toBe(Status);

    useParams.mockImplementationOnce(() => ({ page: 'progress' }));
    const result5 = CompleteProfile();
    expect(result5.type).toBe(Status);

    useParams.mockImplementationOnce(() => ({ page: 'failed' }));
    const result6 = CompleteProfile();
    expect(result6.type).toBe(Status);

    useParams.mockImplementationOnce(() => ({ page: 'verify-location' }));
    const result7 = CompleteProfile();
    expect(result7.type).toBe(VerifyLocation);

    useParams.mockImplementationOnce(() => ({ page: 'verify-location-call' }));
    const result8 = CompleteProfile();
    expect(result8.type).toBe(VerifyLocation);

    useParams.mockImplementationOnce(() => ({ page: 'verify-location-ip' }));
    const result9 = CompleteProfile();
    expect(result9.type).toBe(VerifyLocation);

    useParams.mockImplementationOnce(() => ({ page: 'verify-location-ip-check' }));
    const result10 = CompleteProfile();
    expect(result10.type).toBe(VerifyLocation);
  });

  test('Subroutes verify email', () => {
    const dispatch = jest.fn();

    useParams.mockImplementationOnce(() => ({ page: 'verify-email' }));
    useDispatch.mockImplementationOnce(() => dispatch);
    const result1 = Verify();
    result1.props.children.props.onSubmit(123123, 'email');
    expect(dispatch).toHaveBeenCalled();
    expect(result1.props.children.type).toBe(VerifyEmailForm);

    useParams.mockImplementationOnce(() => ({ page: 'verify-id' }));
    useDispatch.mockImplementationOnce(() => dispatch);
    const result2 = Verify();
    result2.props.children.props.onSubmit(123123, 'id');
    expect(dispatch).toHaveBeenCalled();
    expect(result2.props.children.type).toBe(VerifyIDForm);
  });

  test('typeIdNumber', () => {
    expect(typeIdNumber('3171074805841235')).toBe('ktp');
    expect(typeIdNumber('123456789012')).toBe('sim');
    expect(typeIdNumber('A1234567D')).toBe('passport');
  });
});
