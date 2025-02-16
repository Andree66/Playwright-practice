import { test, expect, Locator } from '@playwright/test';
import HomePage from '../../pom/pages/HomePage';
import SignInForm from '../../pom/forms/SignInForm';
import { SIGNIN_EMPTY_EMAIL, SIGNIN_EMPTY_PASSWORD, SIGNIN_INVALID_EMAIL, SIGNIN_WRONG_DATA } from '../../test-data/constants/errors';
import GaragePage from '../../pom/pages/GaragePage';


test.describe(('Setup users'), () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);
        await homePage.open();
        await homePage.clickSignInButton();
    })

    test('Log in and save state - main user', async ({ page }) => {
        // await homePage.open();
        // await homePage.clickSignInButton();
        await signInForm.loginWithCredentials('kostenko@mail.com', 'Qwerty1234567');
        await garagePage.verifyPageIsOpen();
        await page.context().storageState({ path: './test-data/states/userOne.json' });
    });


})