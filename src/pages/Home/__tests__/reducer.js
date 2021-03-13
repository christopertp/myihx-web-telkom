import { BILL_FETCHED, DATA_FETCHED, LOADING, PROFILE_FETCHED, NOTIF_FETCHED, CARD_FETCHED } from '../constants';
import reducer from '../reducer';

describe('src/pages/Home/reducer', () => {
  test('case BILL_FETCHED', () => {
    const data = { billDate: '1 June 2020', status: 'PAID', totalAmount: 396525 };
    const result = reducer({}, { type: BILL_FETCHED, bill: { ...data } });
    expect(result.isLoading.b).toBe(false);
    expect(result.bill.billDate).toBe('1 June 2020');
    expect(result.bill.status).toBe('PAID');
    expect(result.bill.totalAmount).toBe(396525);
  });

  test('case CARD_FETCHED', () => {
    const data = { orderId: 'fa1332c6-5229-4c96-91b9-ffa47377a815', title: 'New Installation', description: 'You are scheduled to meet our technician', status: 'NEW_INSTALLATION', date: '2020-05-06T13:00:00+07:00' };
    const result = reducer({}, { type: CARD_FETCHED, card: { ...data } });
    expect(result.isLoading.c).toBe(false);
    expect(result.card.orderId).toBe('fa1332c6-5229-4c96-91b9-ffa47377a815');
    expect(result.card.title).toBe('New Installation');
    expect(result.card.description).toBe('You are scheduled to meet our technician');
    expect(result.card.status).toBe('NEW_INSTALLATION');
    expect(result.card.date).toBe('2020-05-06T13:00:00+07:00');
  });

  test('case DATA_FETCHED', () => {
    const data = { latestNews: 'news', latestOffers: 'offers', subscriptions: 'subs' };
    const result = reducer({}, { type: DATA_FETCHED, ...data });
    expect(result.isLoading.h).toBe(false);
    expect(result.latestNews).toBe('news');
    expect(result.latestOffers).toBe('offers');
    expect(result.subscriptions).toBe('subs');
  });

  test('case LOADING', () => {
    const result = reducer({}, { type: LOADING, isLoading: true, key: 'h' });
    expect(result.isLoading.h).toBe(true);
  });

  test('case NOTIF_FETCHED', () => {
    const data = { title: 'Sorry, you have an outstanding bill', description: 'In order to use your service, please complete the payment', status: 'OUTSTANDING' };
    const result = reducer({}, { type: NOTIF_FETCHED, notif: { ...data } });
    expect(result.isLoading.n).toBe(false);
    expect(result.notif.title).toBe('Sorry, you have an outstanding bill');
    expect(result.notif.description).toBe('In order to use your service, please complete the payment');
    expect(result.notif.status).toBe('OUTSTANDING');
  });

  test('case PROFILE_FETCHED', () => {
    const data = { fullName: 'telkom', profilePicture: 'tes.jpg' };
    const result = reducer({}, { type: PROFILE_FETCHED, ...data });
    expect(result.isLoading.p).toBe(false);
    expect(result.fullName).toBe('telkom');
    expect(result.profilePicture).toBe('tes.jpg');
  });

  test('case default', () => {
    const result = reducer();
    expect(result.isLoading.h).toBe(true);
    expect(result.isLoading.p).toBe(true);
    expect(result.latestNews).toStrictEqual([]);
    expect(result.latestOffers).toStrictEqual([]);
    expect(result.subscriptions).toBe('');
  });
});
