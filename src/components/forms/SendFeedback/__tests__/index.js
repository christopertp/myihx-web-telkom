import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import SendFeedback from '../SendFeedback';

useSelector.mockImplementation(fn => {
  fn({});
  return {
    isLoading: {
      t: false,
      s: false,
    },
    message: '',
  };
});

describe('src/components/forms/SendFeedback', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SendFeedback />);
    expect(tree).toMatchSnapshot();
    useSelector.mockImplementationOnce(() => ({
      isLoading: {
        t: true,
        s: true,
      },
      message: 'error.',
    }));
    SendFeedback.defaultProps.handleSubmit();
    const result = SendFeedback({
      ...SendFeedback.defaultProps,
    });
    const button = result.props.children[3];
    expect(button.props.children.type).toBe(Spinner);
  });
});
