import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ScheduleAppointmentContact from '../ScheduleAppointmentContact';

describe('src/components/forms/ScheduleAppointmentContact', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ScheduleAppointmentContact />);
    expect(tree).toMatchSnapshot();

    ScheduleAppointmentContact.defaultProps.handleSubmit();
    ScheduleAppointmentContact.defaultProps.initialize();
    ScheduleAppointmentContact.defaultProps.onClose();

    const initialize = jest.fn();
    const props = { ...ScheduleAppointmentContact.defaultProps, data: 'tes', initialize };
    ScheduleAppointmentContact(props);
    expect(initialize).toHaveBeenCalledWith('tes');
  });
});
