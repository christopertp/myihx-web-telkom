import { ASSURANCE_FETCHED, DATE_FETCHED, FAILED, INFO_FETCHED, ISSUE_ID_FETCHED, LOADING } from '../constants';
import reducer, { setAssuranceDate, setDate } from '../reducer';

describe('src/pages/ScheduleAppointment/reducer', () => {
  test('case ASSURANCE_FETCHED', () => {
    const result = reducer({}, { type: ASSURANCE_FETCHED, address: 'address', date: [], issue: 'issue' });
    expect(result.isLoading.d).toBe(false);
    expect(result.date.length).toBe(0);
    expect(result.address).toBe('address');
    expect(result.issue).toBe('issue');
  });

  test('case DATE_FETCHED', () => {
    const result = reducer({}, { type: DATE_FETCHED, date: [], });
    expect(result.isLoading.d).toBe(false);
    expect(result.date.length).toBe(0);
  });

  test('case FAILED', () => {
    const result = reducer({}, { type: FAILED, message: 'error', key: 'd' });
    expect(result.isLoading.d).toBe(false);
    expect(result.message).toBe('error');
  });

  test('case INFO_FETCHED', () => {
    const result = reducer({}, { type: INFO_FETCHED, address: 'a', product: 'p' });
    expect(result.address).toBe('a');
    expect(result.product).toBe('p');
    expect(result.isLoading.i).toBe(false);
  });

  test('case ISSUE_ID_FETCHED', () => {
    const result = reducer({}, { type: ISSUE_ID_FETCHED, issueId: 'MIXN-01' });
    expect(result.issueId).toBe('MIXN-01');
    expect(result.message).toBe('');
    expect(result.isLoading.s).toBe(false);
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: false, key: 'i' });
    expect(result.isLoading.i).toBe(false);
  });

  test('case default', () => {
    const result = reducer();
    expect(result.isLoading.d).toBe(true);
    expect(result.address).toBe('');
  });

  test('setAssuranceDate', () => {
    const date = [
      {
        'date': '2020-05-27',
        'partsOfDay': 'Morning',
        'availability': 1,
        'bookingId': '1588067957025_1',
        'crewId': 'CREWMIHX',
        'information': 'Crew pada STO terdekat',
        'slotId': 'early-morning',
        'timeSlot': {
          'partsOfDay': 'Morning',
          'slot': '8:00 - 12:00',
          'time': '10:30',
          'date': '2020-05-27'
        }
      },
      {
        'date': '2020-05-27',
        'partsOfDay': 'Afternoon',
        'availability': 1,
        'bookingId': '1588067957025_3',
        'crewId': 'CREWMIHX',
        'information': 'Crew pada STO terdekat',
        'slotId': 'morning',
        'timeSlot': {
          'partsOfDay': 'Afternoon',
          'slot': '12:00 - 17:00',
          'time': '15:30',
          'date': '2020-05-27'
        }
      },
      {
        'date': '2020-05-27',
        'partsOfDay': 'Morning',
        'availability': 1,
        'bookingId': '1588067957241_1',
        'crewId': 'CREWMIHX',
        'information': 'Crew pada STO terdekat',
        'slotId': 'morning',
        'timeSlot': {
          'partsOfDay': 'Morning',
          'slot': '8:00 - 12:00',
          'time': '10:30',
          'date': '2020-05-27'
        }
      },
      {
        'date': '2020-05-27',
        'partsOfDay': 'Afternoon',
        'availability': 1,
        'bookingId': '1588067957241_3',
        'crewId': 'CREWMIHX',
        'information': 'Crew pada STO terdekat',
        'slotId': 'early-morning',
        'timeSlot': {
          'partsOfDay': 'Afternoon',
          'slot': '12:00 - 17:00',
          'time': '15:30',
          'date': '2020-05-27'
        }
      },
      {
        'date': '2020-05-28',
        'partsOfDay': 'Afternoon',
        'availability': 1,
        'bookingId': '1588067957504_2',
        'crewId': 'CREWMIHX',
        'information': 'Crew pada STO terdekat',
        'slotId': 'early-morning',
        'timeSlot': {
          'partsOfDay': 'Afternoon',
          'slot': '12:00 - 17:00',
          'time': '13:00',
          'date': '2020-05-28'
        }
      },
      {
        'date': '2020-05-28',
        'partsOfDay': 'Morning',
        'availability': 1,
        'bookingId': '1588067957504_2',
        'crewId': 'CREWMIHX',
        'information': 'Crew pada STO terdekat',
        'slotId': 'morning',
        'timeSlot': {
          'partsOfDay': 'Morning',
          'slot': '12:00 - 17:00',
          'time': '13:00',
          'date': '2020-05-28'
        }
      },
    ];
    const result = setAssuranceDate(date);
    expect(result.length).toBe(2);
  });

  test('setDate', () => {
    const date = [
      {
        'date': '2020-05-27',
        'data': {
          'partsOfDay': 'Morning',
          'availability': 1,
          'bookingId': '1588067957025_1',
          'crewId': 'CREWMIHX',
          'information': 'Crew pada STO terdekat',
          'timeSlot': {
            'partsOfDay': 'Morning',
            'slot': '8:00 - 12:00',
            'time': '10:30',
            'date': '2020-05-27'
          }
        }
      },
      {
        'date': '2020-05-27',
        'data': {
          'partsOfDay': 'Afternoon',
          'availability': 1,
          'bookingId': '1588067957025_3',
          'crewId': 'CREWMIHX',
          'information': 'Crew pada STO terdekat',
          'timeSlot': {
            'partsOfDay': 'Afternoon',
            'slot': '12:00 - 17:00',
            'time': '15:30',
            'date': '2020-05-27'
          }
        }
      },
      {
        'date': '2020-05-27',
        'data': {
          'partsOfDay': 'Morning',
          'availability': 1,
          'bookingId': '1588067957241_1',
          'crewId': 'CREWMIHX',
          'information': 'Crew pada STO terdekat',
          'timeSlot': {
            'partsOfDay': 'Morning',
            'slot': '8:00 - 12:00',
            'time': '10:30',
            'date': '2020-05-27'
          }
        }
      },
      {
        'date': '2020-05-27',
        'data': {
          'partsOfDay': 'Afternoon',
          'availability': 1,
          'bookingId': '1588067957241_3',
          'crewId': 'CREWMIHX',
          'information': 'Crew pada STO terdekat',
          'timeSlot': {
            'partsOfDay': 'Afternoon',
            'slot': '12:00 - 17:00',
            'time': '15:30',
            'date': '2020-05-27'
          }
        }
      },
      {
        'date': '2020-05-28',
        'data': {
          'partsOfDay': 'Afternoon',
          'availability': 1,
          'bookingId': '1588067957504_2',
          'crewId': 'CREWMIHX',
          'information': 'Crew pada STO terdekat',
          'timeSlot': {
            'partsOfDay': 'Afternoon',
            'slot': '12:00 - 17:00',
            'time': '13:00',
            'date': '2020-05-28'
          }
        }
      },
      {
        'date': '2020-05-28',
        'data': {
          'partsOfDay': 'Morning',
          'availability': 1,
          'bookingId': '1588067957504_2',
          'crewId': 'CREWMIHX',
          'information': 'Crew pada STO terdekat',
          'timeSlot': {
            'partsOfDay': 'Morning',
            'slot': '12:00 - 17:00',
            'time': '13:00',
            'date': '2020-05-28'
          }
        }
      },
    ];
    const result = setDate(date);
    expect(result.length).toBe(2);
  });
});
