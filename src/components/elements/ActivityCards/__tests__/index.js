import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ActivityCards from '../ActivityCards';

describe('src/components/fragments/ActivityCards', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const data = { orderId: 'fa1332c6-5229-4c96-91b9-ffa47377a815', title: 'New Installation', description: 'You are scheduled to meet our technician', status: 'NEW_INSTALLATION' };
    const tree = shallow.render(<ActivityCards cards={data} />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading', () => {
    const cards = { status: 'UPLOAD_KYC' };
    const isLoading = true;
    const result = ActivityCards({ cards, isLoading });
    expect(result.props.children[1].props.className).toBe('loading');
  });

  test('render no status', () => {
    const cards = { status: '' };
    const result = ActivityCards({ cards, isLoading: false });
    expect(result).toBe(null);
  });
});
