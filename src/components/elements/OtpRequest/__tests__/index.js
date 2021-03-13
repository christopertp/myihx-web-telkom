import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../Spinner';
import OtpRequest from '../OtpRequest';

describe('src/components/elements/OtpRequest', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<OtpRequest />);
    expect(tree).toMatchSnapshot();
  });

  test('loading & eroor state', () => {
    const props = { isLoading: true, message: 'error', type: 'SMS' };
    const result = OtpRequest({ ...OtpRequest.defaultProps, ...props });
    expect(result.props.children[0][1].props.children[2].type).toBe(Spinner);
    expect(result.props.children[1].props.children).toBe('error');
  });
});
