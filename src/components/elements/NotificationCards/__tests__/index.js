import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import NotificationCards from '../NotificationCards';

describe('src/components/elements/NotificationCards', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const data = { title: 'Sorry, you have an outstanding bill', description: 'In order to use your service, please complete the payment', status: 'OUTSTANDING' };
    const tree = shallow.render(<NotificationCards notif={data} />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading', () => {
    const notif = { status: 'OUTSTANDING' };
    const isLoading = true;
    const result = NotificationCards({ notif, isLoading });
    expect(result.props.children.props.className).toBe('loading');
  });

  test('render no status', () => {
    const notif = { status: '' };
    const result = NotificationCards({ notif, isLoading: false });
    expect(result).toBe(null);
  });
});
