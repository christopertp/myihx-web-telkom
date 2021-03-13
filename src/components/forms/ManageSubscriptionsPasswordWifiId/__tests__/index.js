import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import ManageSubscriptionsPasswordWifiId from '../ManageSubscriptionsPasswordWifiId';

useSelector.mockImplementation(fn => {
  fn(({ manageSubscriptions: '' }));
  return { isLoading:{ s: false }, message: '' };
});

describe('src/components/forms/ManageSubscriptionsPasswordWifiId', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ManageSubscriptionsPasswordWifiId />);
    expect(tree).toMatchSnapshot();

    useSelector.mockImplementationOnce(() => ({ isLoading:{ s: true }, }));
    ManageSubscriptionsPasswordWifiId.defaultProps.handleSubmit();
    ManageSubscriptionsPasswordWifiId.defaultProps.handleCancel();
    const result = ManageSubscriptionsPasswordWifiId({
      ...ManageSubscriptionsPasswordWifiId.defaultProps,
      message:'test error'
    });
    const footer = result.props.children[3];
    expect(footer.props.children[1].props.children.type).toBe(Spinner);
  });
});
