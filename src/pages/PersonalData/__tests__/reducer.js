import { FAILED, FETCHED, LOADING } from '../constants';
import reducer from '../reducer';

describe('src/pages/ScheduleInstallation/reducer', () => {
  test('case FAILED', () => {
    const result = reducer({}, { type: FAILED, message: 'error' });
    expect(result.isLoading).toBe(false);
    expect(result.message).toBe('error');
  });

  test('case FETCHED with data', () => {
    const validation = { invalidReason: 'error' };
    const data = { signature: 'signature', type: 'type', validation };
    const result = reducer({}, { type: FETCHED, data });
    expect(result.invalid).toBe('error');
    expect(result.isLoading).toBe(false);
    expect(result.form.type).toBe('type');
    expect(result.photos.sign).toBe('signature');
    expect(result.message).toBe('');
  });

  test('case FETCHED no data', () => {
    const result = reducer({}, { type: FETCHED, data: '' });
    expect(result.isLoading).toBe(false);
    expect(result.form).toBe('');
    expect(result.photos).toBe('');
    expect(result.message).toBe('');
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: false });
    expect(result.isLoading).toBe(false);
  });

  test('case default', () => {
    const result = reducer();
    expect(result.isLoading).toBe(true);
    expect(result.message).toBe('');
  });
});
