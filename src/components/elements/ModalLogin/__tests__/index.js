import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ModalLogin from '../ModalLogin';

describe('src/components/elements/ModalLogin', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalLogin />);
    expect(tree).toMatchSnapshot();
    ModalLogin.defaultProps.onClose();
  });
});
