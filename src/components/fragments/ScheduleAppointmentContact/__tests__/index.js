import React from 'react';
import { useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import ScheduleAppointmentContact, { Add, Edit, GoodToKnow } from '../ScheduleAppointmentContact';

const { defaultProps } = ScheduleAppointmentContact;

describe('src/components/fragments/ScheduleAppointmentContact', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ScheduleAppointmentContact />);
    expect(tree).toMatchSnapshot();
  });

  test('render with button Edit', () => {
    const props = { ...defaultProps, data: {} };
    const result = ScheduleAppointmentContact(props);
    expect(result.props.children[0].props.children[1].type).toBe(Edit);
  });

  test('calls onSubmit & setModals', () => {
    defaultProps.setModal();
    defaultProps.setPayload();

    const setModal = jest.fn();
    const setPayload = jest.fn();
    const props = { ...defaultProps, setModal, setPayload };
    const result = ScheduleAppointmentContact(props);

    result.props.children[0].props.children[1].props.onClick();
    expect(setModal).toHaveBeenNthCalledWith(1, 'contact');

    result.props.children[1].props.onClose();
    expect(setModal).toHaveBeenNthCalledWith(2, '');

    result.props.children[1].props.children[2].props.onClose();
    expect(setModal).toHaveBeenNthCalledWith(3, '');

    result.props.children[1].props.children[2].props.onSubmit('tes');
    expect(setPayload).toHaveBeenNthCalledWith(1, { contactSecondary: 'tes' });
    expect(setModal).toHaveBeenNthCalledWith(4, '');
  });

  test('Add', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add onClick={() => {}} />);
    expect(tree).toMatchSnapshot();
  });

  test('Edit', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Edit data={{}} onClick={() => {}} />);
    expect(tree).toMatchSnapshot();
  });

  test('GoodToKnow', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<GoodToKnow />);
    expect(tree).toMatchSnapshot();
  });

  test('GoodToKnow type service', () => {
    useParams.mockImplementationOnce(() => ({ type: 'service' }));
    const result = GoodToKnow();
    expect(result).toBe(null);
  });
});
