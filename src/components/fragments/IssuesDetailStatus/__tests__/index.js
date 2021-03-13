import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import IssuesDetailStatus, { Appointment, Ticket, Address, Technician, Steps } from '../IssuesDetailStatus';

const store = {
  address: 'address',
  schedule: {
    date: '2011-10-01',
    slot: '10.00',
  },
  isLoading: {
    d: false,
  },
  message: '',
  step: 2,
  summary: 'Issue',
  technician: {
    name: 'Telkom',
    tel: '08123456',
  },
  type: 'fisik',
};

useSelector.mockImplementation(fn => {
  fn({});
  return store;
});

describe('src/components/fragments/IssuesDetailStatus', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<IssuesDetailStatus />);
    expect(tree).toMatchSnapshot();
  });

  test('Appointment', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Appointment />);
    expect(tree).toMatchSnapshot();
  });

  test('Appointment loading', () => {
    useSelector.mockImplementationOnce(() => ({ ...store, isLoading: { d: true } }));
    const res = Appointment();
    const card = res.props.children[1];
    expect(card.props.children[0].props.children).toBe('');
    expect(card.props.children[2].props.className).toBe('loading');
  });

  test('Ticket', () => {
    useSelector.mockImplementationOnce(fn => {
      fn({});
      return { ...store, type: 'logic' };
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Ticket />);
    expect(tree).toMatchSnapshot();
  });

  test('Ticket loading', () => {
    useSelector.mockImplementationOnce(() => ({ ...store, isLoading: { d: true } }));
    const res = Ticket();
    expect(res.props.children[1].props.children[1].props.className).toBe('loading');
  });

  test('Address', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Address />);
    expect(tree).toMatchSnapshot();
  });

  test('Address loading', () => {
    useSelector.mockImplementationOnce(() => ({ ...store, isLoading: { d: true } }));
    const res = Address();
    expect(res.props.children[1].props.className).toBe('loading');
  });

  test('Technician', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Technician />);
    expect(tree).toMatchSnapshot();
  });

  test('Technician onCall & state hidden', () => {
    delete window.location;
    window.location = {
      href: '',
    };
    const res1 = Technician();
    res1.props.children[1].props.children[4].props.onClick();
    expect(window.location.href).toBe('tel:08123456');

    useSelector.mockImplementationOnce(() => ({ ...store, technician: { name: '' } }));
    const res2 = Technician();
    expect(res2.props.children).toBe('Report Process');
  });

  test('Steps', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Steps />);
    expect(tree).toMatchSnapshot();
  });
});
