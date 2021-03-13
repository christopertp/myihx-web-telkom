import fetch from '../../utils/fetch';
import * as assurance from '../assurance';
import * as billing from '../billing';
import * as notification from '../notification';
import * as nps from '../nps';
import * as order from '../order';
import * as payment from '../payment';
import * as product from '../product';
import * as subscription from '../subscription';
import * as user from '../user';
import * as rewards from '../rewards';

jest.mock('../../utils/fetch', () => ({
  __esModule: true,
  default: jest.fn(),
  getUrl: jest.fn(),
}));

fetch.mockResolvedValue('response');

const expectTest = items => {
  Object.keys(items).forEach(async i => {
    const res = await items[i]();
    expect(res).toBe('response');
  });
};

describe('src/services', () => {
  test('services', () => {
    expectTest(assurance);
    expectTest(billing);
    expectTest(notification);
    expectTest(nps);
    expectTest(order);
    expectTest(payment);
    expectTest(product);
    expectTest(subscription);
    expectTest(user);
    expectTest(rewards);
  });
});
