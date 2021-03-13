import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import ManageSubscriptionsDeviceName from '../ManageSubscriptionsDeviceName';

useSelector.mockImplementation(fn => {
  fn(({ manageSubscriptions: '' }));
  return { isLoading:{ s: false }, message: '' };
});

describe('src/components/forms/ManageSubscriptionsDeviceName', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ManageSubscriptionsDeviceName />);
    expect(tree).toMatchSnapshot();

    useSelector.mockImplementationOnce(() => ({ isLoading:{ s: true }, }));
    ManageSubscriptionsDeviceName.defaultProps.handleSubmit();
    ManageSubscriptionsDeviceName.defaultProps.handleCancel();
    const result = ManageSubscriptionsDeviceName({
      ...ManageSubscriptionsDeviceName.defaultProps,
      message:'test error'
    });
    const footer = result.props.children[3];
    expect(footer.props.children[1].props.children.type).toBe(Spinner);
  });
});
