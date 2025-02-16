import { test as baseTest, chromium } from '@playwright/test';
import GaragePage from '../../pom/pages/GaragePage';

export const test = baseTest.extend<{ userGaragePage: GaragePage }>({
  userGaragePage: async ({}, use) => {
    // Запускаємо браузер
    const browser = await chromium.launch({ headless: false }); 
    const context = await browser.newContext({
      storageState: './test-data/states/userOne.json', // Авто-логин юзера
    });

    const page = await context.newPage();
    const garagePage = new GaragePage(page);
    
    await garagePage.openPage();   
    await use(garagePage); 
    await browser.close();
  },
});

export { expect } from '@playwright/test';


