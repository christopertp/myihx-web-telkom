import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../components/elements/Spinner';
import ProfileAboutPoin from '../../../components/fragments/ProfileAboutPoin';
import ProfileChangeEmail from '../../../components/fragments/ProfileChangeEmail';
import ProfileChangeMobile from '../../../components/fragments/ProfileChangeMobile';
import Profile, { ChangePassword, Edit, User } from '../Profile';

jest.mock('../actions', () => ({
  fetchChangePassword: jest.fn(),
  fetchData: jest.fn(),
  fetchTmoney: jest.fn(),
  fetchStatusCard: jest.fn(),
  fetchUpdateProfile: jest.fn(),
  resetMessage: jest.fn(),
}));

useSelector.mockImplementation(fn => {
  fn({});
  return { isLoading: { p: false } };
});

useDispatch.mockImplementation(() => jest.fn());
useParams.mockImplementation(() => ({ page: '' }));

describe('src/pages/Profile', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Profile />);
    expect(tree).toMatchSnapshot();
  });

  test('render subroutes', () => {
    useParams.mockImplementationOnce(() => ({ page: 'about-point' }));
    const result = Profile();
    expect(result.props.children.type).toBe(ProfileAboutPoin);

    useParams.mockImplementationOnce(() => ({ page: 'change-password' }));
    const result1 = Profile();
    expect(result1.props.children.type).toBe(ChangePassword);

    useParams.mockImplementationOnce(() => ({ page: 'change-mobile' }));
    const result2 = Profile();
    expect(result2.props.children.type).toBe(ProfileChangeMobile);

    useParams.mockImplementationOnce(() => ({ page: 'change-email' }));
    const result3 = Profile();
    expect(result3.props.children.type).toBe(ProfileChangeEmail);

    useParams.mockImplementationOnce(() => ({ page: 'edit' }));
    const result4 = Profile();
    expect(result4.props.children.type).toBe(Edit);
  });

  test('ChangePassword', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ChangePassword />);
    expect(tree).toMatchSnapshot();

    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);
    const result = ChangePassword();
    result.props.children.props.onSubmit({ currentPassword: 'test' });
    expect(dispatch).toHaveBeenCalled();
  });

  test('Edit', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Edit />);
    expect(tree).toMatchSnapshot();

    const profilePicture = new Blob();
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);
    const result = Edit();
    result.props.children.props.onSubmit({ address: 'test', profilePicture });
    expect(dispatch).toHaveBeenCalled();

    useSelector.mockImplementationOnce(() => ({ isLoading: { p: true } }));
    const result2 = Edit();
    expect(result2.props.children.type).toBe(Spinner);
  });

  test('User', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<User />);
    expect(tree).toMatchSnapshot();
  });
});
