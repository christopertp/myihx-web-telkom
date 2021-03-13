import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SendFeedback from '../SendFeedback';
import { useDispatch } from 'react-redux';

jest.mock('../actions', () => ({
  fetchData: jest.fn(),
  fetchSendFeedback: jest.fn(),
}));

describe('src/pages/SendFeedback', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SendFeedback />);
    expect(tree).toMatchSnapshot();
  });
  test('onSubmit', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);
    const result = SendFeedback();
    result.props.children.props.onSubmit({ topicId: '01', message: 'message' });
    expect(dispatch).toHaveBeenCalled();
  });
});
