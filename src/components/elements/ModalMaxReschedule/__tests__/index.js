import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ModalMaxReschedule from '../ModalMaxReschedule';

describe('src/components/elements/ModalMaxReschedule', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalMaxReschedule />);
    expect(tree).toMatchSnapshot();
    ModalMaxReschedule.defaultProps.onClose();
  });
});
