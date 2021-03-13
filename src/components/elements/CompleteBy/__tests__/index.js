import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CompleteBy from '../CompleteBy';

jest.mock('../../../../hooks/useTimer', () => () => ({
  time: ['', '', ''],
}));

describe('src/components/elements/CompleteBy', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CompleteBy initTime={10000} />);
    expect(tree).toMatchSnapshot();
  });
});
