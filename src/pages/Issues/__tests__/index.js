import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import Issues, { Detail, AddComment, Comments, Action } from '../Issues';

jest.mock('../actions', () => ({
  fetchComments: jest.fn(),
  fetchData: jest.fn(),
  fetchPostComment: jest.fn(),
}));

const store = {
  address: 'address',
  comments: [{
    date: '1/01/2020',
    message: 'comment',
  }],
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

useContext.mockImplementation(() => ({
  modal: '',
  setModal: jest.fn(),
}));

useSelector.mockImplementation(fn => {
  fn({});
  return store;
});

describe('src/pages/Issues', () => {
  test('render subroutes', () => {
    useParams.mockImplementationOnce(() => ({ id: '01' }));

    const res1 = Issues();
    expect(res1.props.children[0].type).toBe(Detail);

    const res2 = Issues();
    expect(res2.props.children[0].props.children).toBe('List Issues');
  });

  test('Detail', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('Detail modal 404', () => {
    const setModal = jest.fn();
    useContext.mockImplementationOnce(() => ({ modal: '404', setModal }));

    const push = jest.fn();
    useHistory.mockImplementationOnce(() => ({ push }));

    useSelector.mockImplementationOnce(() => ({ ...store, message: '404' }));

    const res = Detail();
    expect(setModal).toHaveBeenCalledWith('404');

    res.props.children[4].props.onClose();
    expect(setModal).toHaveBeenCalledWith('');
    expect(push).toHaveBeenCalledWith('/issues');
  });

  test('AddComment', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AddComment />);
    expect(tree).toMatchSnapshot();
  });

  test('Comments', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Comments />);
    expect(tree).toMatchSnapshot();
  });

  test('Action', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Action />);
    expect(tree).toMatchSnapshot();
  });

  test('Action onClick', () => {
    const setModal = jest.fn();
    useContext.mockImplementationOnce(() => ({ setModal }));
    const res1 = Action();
    res1.props.children[2].props.onClick();
    expect(setModal).toHaveBeenCalledWith('solved');
  });
});
