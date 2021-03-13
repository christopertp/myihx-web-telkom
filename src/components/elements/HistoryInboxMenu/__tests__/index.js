import React from 'react';
import { useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import HistoryInboxMenu from '../HistoryInboxMenu';

useParams.mockImplementation(() => ({ page: 'bill' }));

describe('src/components/elements/HistoryInboxMenu', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const links = [
      { page: 'bill', to: '/history/bill', text: 'Bill' },
    ];
    const tree = shallow.render(<HistoryInboxMenu links={links} />);
    expect(tree).toMatchSnapshot();
  });

  test('render is not Active', () => {
    useParams.mockImplementationOnce(() => ({ page: 'purchase' }));
    const links = [
      { page: 'bill', to: '/history/bill', text: 'Bill' },
    ];

    const result = HistoryInboxMenu({ links });
    expect(result.type).toBe('nav');
  });
});
