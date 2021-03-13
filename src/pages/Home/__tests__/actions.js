import { billingInfo } from '../../../services/billing';
import { notifCard } from '../../../services/payment';
import { home } from '../../../services/product';
import { profile, statusCard } from '../../../services/user';
import * as actions from '../actions';
import { BILL_FETCHED, DATA_FETCHED, LOADING, PROFILE_FETCHED, CARD_FETCHED, NOTIF_FETCHED } from '../constants';

jest.mock('../../../services/billing', () => ({
  billingInfo: jest.fn(),
}));

jest.mock('../../../services/payment', () => ({
  notifCard: jest.fn(),
}));

jest.mock('../../../services/product', () => ({
  home: jest.fn(),
}));

jest.mock('../../../services/user', () => ({
  profile: jest.fn(),
  statusCard: jest.fn(),
}));

describe('src/pages/Home/actions', () => {
  test('fetchBill', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const data = { billDate: '1 June 2020', status: 'PAID', totalAmount: 396525 };
    billingInfo.mockResolvedValueOnce({ data });
    await actions.fetchBill()(dispatch);
    expectTest(1, { isLoading: true, key: 'b', type: LOADING });
    expectTest(2, { bill: { billDate: '1 June 2020', status: 'PAID', totalAmount: 396525 }, type: BILL_FETCHED });

    billingInfo.mockRejectedValueOnce();
    await actions.fetchBill()(dispatch);
    expectTest(4, { bill: '', type: BILL_FETCHED });
  });

  test('fetchHome', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const data = { latestNews: 'news', latestOffers: 'offers', subscriptions: 'subs' };
    home.mockResolvedValueOnce({ data });
    await actions.fetchHome()(dispatch);
    expectTest(1, { isLoading: true, key: 'h', type: LOADING });
    expectTest(2, { latestNews: 'news', latestOffers: 'offers', subscriptions: 'subs', type: DATA_FETCHED });

    home.mockRejectedValueOnce();
    await actions.fetchHome()(dispatch);
    expectTest(4, { isLoading: false, key: 'h', type: LOADING });
  });

  test('fetchProfile', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const data = { fullName: 'telkom', profilePicture: 'tes.jpg' };
    profile.mockResolvedValueOnce({ data });
    await actions.fetchProfile()(dispatch);
    expectTest(1, { isLoading: true, key: 'p', type: LOADING });
    expectTest(2, { fullName: 'telkom', profilePicture: 'tes.jpg', type: PROFILE_FETCHED });

    profile.mockRejectedValueOnce();
    await actions.fetchProfile()(dispatch);
    expectTest(4, { isLoading: false, key: 'p', type: LOADING });
  });

  test('fetchStatusCard', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const data = { orderId: 'fa1332c6-5229-4c96-91b9-ffa47377a815', title: 'New Installation', description: 'You are scheduled to meet our technician', status: 'NEW_INSTALLATION', date: '2020-05-06T13:00:00+07:00' };
    statusCard.mockResolvedValueOnce({ data });
    await actions.fetchStatusCard()(dispatch);
    expectTest(1, { isLoading: true, key: 'c', type: LOADING });
    expectTest(2, { card: data, type: CARD_FETCHED });

    statusCard.mockRejectedValueOnce();
    await actions.fetchStatusCard()(dispatch);
    expectTest(4, { isLoading: false, key: 'c', type: LOADING });
  });

  test('fetchNotifCard', async () => {
    const dispatch = jest.fn();
    const expectTest = expect(dispatch).toHaveBeenNthCalledWith;

    const data = { title: 'Sorry, you have an outstanding bill', description: 'In order to use your service, please complete the payment', status: 'OUTSTANDING' };
    notifCard.mockResolvedValueOnce({ data });
    await actions.fetchNotifCard()(dispatch);
    expectTest(1, { isLoading: true, key: 'n', type: LOADING });
    expectTest(2, { notif: data, type: NOTIF_FETCHED });

    notifCard.mockRejectedValueOnce();
    await actions.fetchNotifCard()(dispatch);
    expectTest(4, { isLoading: false, key: 'n', type: LOADING });
  });
});
