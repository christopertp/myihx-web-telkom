import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ModalConfirmation from '../ModalConfirmation';

describe('src/components/elements/ModalConfirmation', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalConfirmation />);
    expect(tree).toMatchSnapshot();
    ModalConfirmation.defaultProps.onClose();
    ModalConfirmation.defaultProps.onAccept();
    ModalConfirmation.defaultProps.onRefuse();
  });

  test('reverse button', () => {
    const props = {
      ...ModalConfirmation.defaultProps,
      reverseBtn: true,
    };
    const result = ModalConfirmation(props);
    const { children } = result.props;
    expect(children[2].props.children[0].props.variant).toBe('bordered');
    expect(children[2].props.children[0].props.children).toBe('No');
    expect(children[2].props.children[1].props.children).toBe('Yes');
  });
});
