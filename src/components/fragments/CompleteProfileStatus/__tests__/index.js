import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { useParams, useHistory } from 'react-router-dom';
import CompleteProfileStatus from '../CompleteProfileStatus';
import Button from '../../../elements/Button';

describe('src/components/fragments/CompleteProfileStatus', () => {
  test('render', () => {
    useParams.mockImplementationOnce(() => ({ page: 'success' }));
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CompleteProfileStatus type="success" />);
    expect(tree).toMatchSnapshot();
  });

  test('status process, failed', () => {
    useParams.mockImplementationOnce(() => ({ page: 'progress' }));
    const result1 = CompleteProfileStatus();
    expect(result1.props.children.props.children[0].type).toBe('p');
    expect(result1.props.children.props.children[1].type).toBe(Button);

    useParams.mockImplementationOnce(() => ({ page: 'failed' }));
    const result2 = CompleteProfileStatus();
    expect(result2.props.children.type).toBe(Button);

    const push = jest.fn();
    useHistory.mockImplementationOnce(() => ({ push }));

    useParams.mockImplementationOnce(() => ({ page: 'progress' }));
    const result4 = CompleteProfileStatus();
    result4.props.children.props.children[1].props.onClick();
    expect(push).toHaveBeenNthCalledWith(1, '/profile');
  });
});
