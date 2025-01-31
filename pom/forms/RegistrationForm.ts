import { expect, Locator, Page } from "@playwright/test";

export default class RegistrationForm {
    readonly page: Page;
    readonly nameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly repeatPasswordField: Locator;
    readonly fieldErrorMessage: Locator;
    readonly registerButton: Locator;
    readonly formErrorMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.nameField = page.locator('#signupName');
        this.lastNameField = page.locator('#signupLastName');
        this.emailField = page.locator('#signupEmail');
        this.passwordField = page.locator('#signupPassword');
        this.repeatPasswordField = page.locator('#signupRepeatPassword');
        this.fieldErrorMessage = page.locator('.invalid-feedback');
        this.registerButton = page.locator('button:has-text("Register")');
        this.formErrorMessage = page.locator('.alert-danger');

    }

    // async triggerErrorOnField(fieldName: string) {
    //     const field = fieldName === 'email' ? this.emailField : this.passwordField;
    //     await field.focus();
    //     await field.blur();
    // }
    /////////
    async triggerErrorOnName(name: string) {
        await this.nameField.focus();
        await this.nameField.blur();
    }

    async triggerErrorOnLastName(lastName: string) {
        await this.lastNameField.focus();
        await this.lastNameField.blur();
    }

    async triggerErrorOnEmail(email: string) {
        await this.emailField.focus();
        await this.emailField.blur();
    }

    async triggerErrorOnPassword(password: string) {
        await this.passwordField.focus();
        await this.passwordField.blur();
    }

    async triggerErrorOnReEnterPassword(password: string) {
        await this.repeatPasswordField.focus();
        await this.repeatPasswordField.blur();
    }
    ///////////

    async enterName(name: string) {
        await this.nameField.fill(name);
    }

    async enterLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

    async enterEmail(email: string) {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async enterRepeatPassword(repassword: string) {
        await this.repeatPasswordField.fill(repassword);
    }

    async verifyFieldErrorMessageByText(text: string) {
        await expect(this.fieldErrorMessage).toHaveText(text);
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async verifyFormErrorMessage() {
        await expect(this.formErrorMessage).toBeVisible();
    }

    async successfulRegistration(name: string, lastName: string, email: string, password: string, repassword: string) {

        await this.enterName(name);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.enterRepeatPassword(repassword);
        await this.clickRegisterButton();


    }

    async unSuccessfulRegistration(name: string, lastName: string, email: string, password: string, repassword: string) {

        await this.enterName(name);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.enterRepeatPassword(repassword);
        


    }

    async verifyRegisterButtonDisabled() {
        await expect(this.registerButton).toBeDisabled();

    }
}