import { COMMENT_POSTED, COMMENTS_FETCHED, FAILED, FETCHED, LOADING, SET_STEP } from '../constants';
import reducer, { mapData } from '../reducer';

const responseData = {
  address: 'address',
  schedule: {
    timeSlot: { date: '11-10-2011', slot: '10.00' },
  },
  progress: { status: 'IN_PROGRESS' },
  issueSummary: { id: '01' },
  technician: {
    displayName: 'Telkom', phone: '08123456',
  },
  type: 'Fisik',
};

describe('src/pages/Issues/reducer', () => {
  test('case COMMENT_POSTED', () => {
    const result = reducer(undefined, { type: COMMENT_POSTED, comment: 'check' });
    expect(result.comments[0]).toBe('check');
    expect(result.isLoading.p).toBe(false);
    expect(result.message).toBe('');
  });

  test('case COMMENTS_FETCHED', () => {
    const result = reducer(undefined, { type: COMMENTS_FETCHED, comments: 'check' });
    expect(result.comments).toBe('check');
    expect(result.isLoading.c).toBe(false);
    expect(result.message).toBe('');
  });

  test('case FAILED', () => {
    const result = reducer(undefined, { type: FAILED, message: 'error', key: 'p' });
    expect(result.isLoading.p).toBe(false);
    expect(result.message).toBe('error');
  });

  test('case FETCHED', () => {
    const result = reducer(undefined, { type: FETCHED, data: responseData });
    expect(result.isLoading.d).toBe(false);
    expect(result.message).toBe('');
    expect(result.address).toBe('address');
    expect(result.schedule.date).toBe('2011-10-11');
    expect(result.schedule.slot).toBe('10.00');
    expect(result.step).toBe(2);
    expect(result.summary).toBe('01');
    expect(result.technician.name).toBe('Telkom');
    expect(result.technician.status).toBe('Repair in progress');
    expect(result.technician.tel).toBe('08123456');
    expect(result.type).toBe('fisik');
  });

  test('case LOADING', () => {
    const result = reducer(undefined, { type: LOADING, isLoading: false, key: 'detail' });
    expect(result.isLoading.d).toBe(false);
  });

  test('case SET_STEP', () => {
    const result = reducer(undefined, { type: SET_STEP, step: 3 });
    expect(result.step).toBe(3);
  });

  test('case default', () => {
    const result = reducer();
    expect(result.address).toBe('');
    expect(result.comments.length).toBe(0);
    expect(result.isLoading.d).toBe(true);
    expect(result.message).toBe('');
    expect(result.step).toBe(0);
    expect(result.summary).toBe('');
  });

  test('mapData step 0', () => {
    const result = mapData({ ...responseData, progress: { status: 'SUBMITTED' } });
    expect(result.technician.name).toBe('');
    expect(result.technician.status).toBe('On the way');
  });

  test('mapData step completed', () => {
    const result = mapData({ ...responseData, progress: { status: 'COMPLETED' } });
    expect(result.technician.status).toBe('Repair complete');
  });
});
