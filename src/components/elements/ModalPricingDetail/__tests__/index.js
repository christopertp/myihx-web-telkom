import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ModalPricingDetail from '../ModalPricingDetail';

describe('src/components/elements/ModalPricingDetail', () => {
  test('render', () => {
    ModalPricingDetail.defaultProps.onClickSubscribe();
    ModalPricingDetail.defaultProps.onClose();
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalPricingDetail />);
    expect(tree).toMatchSnapshot();
  });
});
