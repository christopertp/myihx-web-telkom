import React, { useContext, useState } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import ActivateRewards,
{
  ActivateRewardsCard,
  TermsAndConditions,
  Verify,
  Request,
  SuccessfullCard
} from '../ActivateRewards';
import CheckBox from '../../../components/fields/Checkbox';

jest.mock('../actions', () => ({
  activateReward: jest.fn(),
  verifyOtp: jest.fn(),
  fetchStatusRewards: jest.fn(),
  resendOtp: jest.fn(),
  fetchDataUser: jest.fn(),
}));

useSelector.mockImplementation((fn) => {
  fn({});
  return {};
});

describe('src/pages/ActivateRewards', () => {
  test('render activateRewards', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ActivateRewards />);
    expect(tree).toMatchSnapshot();
  });

  test('render activateRewards success', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ActivateRewards />);
    expect(tree).toMatchSnapshot();


    useParams.mockImplementationOnce(() => ({ page: 'success' }));
    const result = ActivateRewards();
    expect(result.props.children.type).toBe(SuccessfullCard);
  });

  test('render activateRewards request', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ActivateRewards />);
    expect(tree).toMatchSnapshot();


    useParams.mockImplementationOnce(() => ({ page: 'request' }));
    const result = ActivateRewards();
    expect(result.props.children.type).toBe(Request);
  });

  test('render activateRewards verify', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ActivateRewards />);
    expect(tree).toMatchSnapshot();


    useParams.mockImplementationOnce(() => ({ page: 'verify' }));
    const result = ActivateRewards();
    expect(result.props.children.type).toBe(Verify);
  });

  test('render activateRewards verify', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ActivateRewards />);
    expect(tree).toMatchSnapshot();


    useParams.mockImplementationOnce(() => ({ page: 'tnc' }));
    const result = ActivateRewards();
    expect(result.props.children.type).toBe(TermsAndConditions);
  });


  test('ActivateRewardsCard sublogic', () => {
    let data = {
      'isLoading': true,
      'message': '',
      'status': '',
      'mobileNumber': '',
      'deadlineOTP': 0,
      'terms': '',
      'category': [],
      'countOTP': 2,
      'isActivated': '',
    };


    useSelector.mockImplementationOnce(() => (data));
    let result = ActivateRewardsCard();
    expect(result.props.children.props.children[0].type).toBe('div');
    expect(result.props.children.props.children[1].props.children.type).toBe(CheckBox);
    expect(result.props.children.props.children[2].type).toBe('footer');


    const setSelectedCategory = jest.fn();
    const setChecked = jest.fn();
    const dispatch = jest.fn();

    const selectedCategoryArray = [
      {
        'name': 'Prize',
        'icon': 'http://m',
        'terms': 'Lorem',
        'isActivated': 'INACTIVE',
        'isActive': true
      },
      {
        'name': 'Food and Beverage',
        'icon': 'http://m',
        'terms': 'Lorem',
        'isActivated': 'INACTIVE',
        'isActive': true
      },
      {
        'name': 'Shop',
        'icon': 'http://m',
        'terms': 'Lorem',
        'isActivated': 'INACTIVE'
      },
      {
        'name': 'Telkom',
        'icon': 'http://m',
        'terms': 'Lorem',
        'isActivated': 'INACTIVE',
        'isActive': true
      }
    ];

    data = {
      'isLoading': true,
      'message': '',
      'status': '',
      'mobileNumber': '',
      'deadlineOTP': 0,
      'terms': '',
      'category': selectedCategoryArray,
      'countOTP': 2,
      'isActivated': '',
    };

    useSelector.mockImplementationOnce(() => (data));
    useDispatch.mockImplementationOnce(() => dispatch);

    const setUserMobile = jest.fn();
    const setCategory = jest.fn();
    useContext.mockImplementationOnce(() => ({ setUserMobile, setCategory }));

    useState
      .mockImplementationOnce(() => [true, setChecked])
      .mockImplementationOnce(() => [[], setSelectedCategory]);



    result = ActivateRewardsCard();

    useSelector.mockImplementationOnce(() => (data));
    useDispatch.mockImplementationOnce(() => dispatch);

    useContext.mockImplementationOnce(() => ({ setUserMobile, setCategory }));

    useState
      .mockImplementationOnce(() => [true, setChecked])
      .mockImplementationOnce(() => [selectedCategoryArray, setSelectedCategory]);



    ActivateRewardsCard();
    // result = ActivateRewardsCard();
    // console.log('result ActivateRewardsCard ' + JSON.stringify(result));
    // result.props.children.props.children[2].props.children[1].props.disabled = false;
    // result.props.children.props.children[2].props[1].props
    // console.log('result.props.children.props.children ' +
    //   JSON.stringify(result.props.children.props.children[2].props.children));
    // console.log('result.props.children.props.children ' +
    //   JSON.stringify(result));
    // expect(result.props.children.props.children[0].type).toBe('div');
    // expect(result.props.children.props.children[1].props.children.type).toBe(CheckBox);
    // expect(result.props.children.props.children[2].type).toBe('footer');

    // result.props.children.props.children[2].props.children[1].onClick();

    // const onSubmit = jest.fn();
    // useContext.mockImplementationOnce(() => ({ onSubmit }));

    // const submit = result.props.children.props.children[2].props.children[1];
    // console.log('result.props.children.props.children submit ' + JSON.stringify(submit));
    // expect(result.props.children.props.children[0].props.children.type).toBe("div");
    // result.props.children.props.children[2].props.onClick();
    // expect(setReset).toHaveBeenCalledWith(true);
    // useSelector.mockImplementationOnce(fn => {
    //   fn({});
    //   return { result };
    // });

    // const shallow = new ShallowRenderer();
    // const tree = shallow.render(<ActivateRewards />);
    // expect(tree).toMatchSnapshot();


    // const shallow = new ShallowRenderer();
    // const tree = shallow.render(<ActivateRewards />);
    // expect(tree).toMatchSnapshot();


    // useParams.mockImplementationOnce(() => ({ page: '' }));
    // const result = ActivateRewards();
    // console.log('result.props.children ' + JSON.stringify(result.props.children.props[0]));
    // expect(result.props.children.type).toBe(ActivateRewardsCard);
  });


  test('terms and condition sublogic', () => {
    let data = {
      'isLoading': true,
      'message': '',
      'status': '',
      'mobileNumber': '',
      'deadlineOTP': 0,
      'terms': 't&c',
      'category': [],
      'countOTP': 2,
      'isActivated': '',
    };


    useSelector.mockImplementationOnce(() => (data));
    TermsAndConditions();
  });


  test('SuccessfullCard sublogic', () => {
    let data = {
      'isLoading': true,
      'message': '',
      'status': '',
      'mobileNumber': '',
      'deadlineOTP': 0,
      'terms': 't&c',
      'category': [],
      'countOTP': 2,
      'isActivated': '',
    };


    useSelector.mockImplementationOnce(() => (data));
    SuccessfullCard();
  });

  test('Request sublogic', () => {
    let data = {
      'isLoading': true,
      'message': '',
      'status': '',
      'mobileNumber': '',
      'deadlineOTP': 0,
      'terms': 't&c',
      'category': [],
      'countOTP': 2,
      'isActivated': '',
    };


    useSelector.mockImplementationOnce(() => (data));
    Request();
  });

  test('Verify sublogic', () => {
    let data = {
      'isLoading': true,
      'message': '',
      'status': '',
      'mobileNumber': '',
      'deadlineOTP': 0,
      'terms': 't&c',
      'category': [],
      'countOTP': 2,
      'isActivated': '',
    };


    useSelector.mockImplementationOnce(() => (data));
    Verify();

    data = {
      'isLoading': true,
      'message': '',
      'status': '',
      'mobileNumber': '',
      'deadlineOTP': 0,
      'terms': 't&c',
      'category': [],
      'countOTP': -2,
      'isActivated': '',
    };


    useSelector.mockImplementationOnce(() => (data));
    Verify();
    // const result = Verify();
    // console.log('result '+JSON.stringify(result));
  });
});
