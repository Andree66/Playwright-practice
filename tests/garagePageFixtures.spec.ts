import { test, expect } from '../test-data/fixtures/userGaragePage';

test.describe('Garage tests with userGaragePage', () => {
  test('Add Ford Fiesta', async ({ userGaragePage }) => {
    await userGaragePage.addCarByBrandAndModel('Ford', 'Fiesta');
    expect(await userGaragePage.getLastAddedCarName()).toBe('Ford Fiesta');
  });

});