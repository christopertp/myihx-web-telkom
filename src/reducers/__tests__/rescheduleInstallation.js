import { installationReschedule, installationRescheduleDate } from '../../services/order';
import reducer, { DATE_FETCHED, FAILED, LOADING, SUBMITTED, fetchReschedule, fetchRescheduleDate } from '../rescheduleInstallation';

jest.mock('../../services/order', () => ({
  installationReschedule: jest.fn(),
  installationRescheduleDate: jest.fn(),
}));

jest.mock('../../pages/ScheduleAppointment/reducer', () => ({
  setDate: v => v,
}));

describe('src/reducers/rescheduleInstallation', () => {
  test('case DATE_FETCHED', () => {
    const result = reducer({}, { type: DATE_FETCHED, date: 'date' });
    expect(result.date).toBe('date');
    expect(result.isLoading).toBe(false);
    expect(result.message).toBe('');
  });

  test('case FAILED', () => {
    const result = reducer({}, { type: FAILED, message: 'error' });
    expect(result.isLoading).toBe(false);
    expect(result.message).toBe('error');
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: true });
    expect(result.isLoading).toBe(true);
  });

  test('case SUBMITTED', () => {
    const result = reducer({}, { type: SUBMITTED, isLoading: true, newDate: 'date', slot: 'slot' });
    expect(result.isLoading).toBe(false);
    expect(result.message).toBe('');
    expect(result.newDate).toBe('date');
    expect(result.slot).toBe('slot');
  });

  test('case default', () => {
    const result = reducer();
    expect(result.isLoading).toBe(false);
    expect(result.message).toBe('');
  });

  test('fetchReschedule', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const newDate = 'date';
    const slot = 'slot';
    const timeSlot = { date: newDate, slot };

    installationReschedule.mockResolvedValueOnce();
    await fetchReschedule({ timeSlot })(dispatch);
    expectTest(1, { isLoading: true, type: LOADING });
    expectTest(2, { type: SUBMITTED, newDate, slot });
    expectTest(3, '/installation/reschedule-success');

    installationReschedule.mockRejectedValueOnce({ message: 'error' });
    await fetchReschedule()(dispatch);
    expectTest(5, { type: FAILED, message: 'error' });
  });

  test('fetchRescheduleDate', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const data = { availability: 'date' };
    installationRescheduleDate.mockResolvedValueOnce({ data });
    await fetchRescheduleDate()(dispatch);
    expectTest(1, { isLoading: true, type: LOADING });
    expectTest(2, { type: DATE_FETCHED, date: 'date', });

    installationRescheduleDate.mockRejectedValueOnce();
    await fetchRescheduleDate()(dispatch);
    expectTest(4, { type: DATE_FETCHED, date: [], });
  });
});
