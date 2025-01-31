import { test, expect } from '@playwright/test';
import HomePage from '../pom/pages/HomePage';
import SignInForm from '../pom/forms/SignInForm';
import RegistrationForm from '../pom/forms/RegistrationForm';
//import { credentials } from '../test-data/usersData';

test.describe('Check registration form', () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let registrationForm: RegistrationForm;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        registrationForm = new RegistrationForm(page);

        await homePage.open();
        await homePage.clickSignInButton();
        await signInForm.clickRegistrationButton();
    })
////Поле "Name"///////////////////////////////////////
    test.describe('Check field "Name"', () => {
        
    
        test('Check empty field', async () => {

            await registrationForm.triggerErrorOnName('name');
            await registrationForm.verifyFieldErrorMessageByText('Name required');
            await expect(registrationForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Check wrong data:Input with invalid characters (numbers)', async () => {

            await registrationForm.enterName('123');
            await registrationForm.triggerErrorOnName('name');
            await registrationForm.verifyFieldErrorMessageByText('Name is invalid');
            await expect(registrationForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Check wrong data:Input with invalid characters (Cyrillic letters)', async () => {

            await registrationForm.enterName('Вася');
            await registrationForm.triggerErrorOnName('name');
            await registrationForm.verifyFieldErrorMessageByText('Name is invalid');
            await expect(registrationForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        
        test('Check wrong length: less than 2 characters', async () => {

            await registrationForm.enterName('V');
            await registrationForm.triggerErrorOnName('name');
            await registrationForm.verifyFieldErrorMessageByText('Name has to be from 2 to 20 characters long');
            await expect(registrationForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Check wrong length: more than 20 characters', async () => {

            await registrationForm.enterName('Vqwertyqwqwqwqwqwqwqwqwq');
            await registrationForm.triggerErrorOnName('name');
            await registrationForm.verifyFieldErrorMessageByText('Name has to be from 2 to 20 characters long');
            await expect(registrationForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

    });
////Поле Last Name//////////////////////////////////////////////////////////////////
    test.describe('Check field "Last Name"', () => {
        
    
        test('Check empty field', async () => {

            await registrationForm.triggerErrorOnLastName('lastName');
            await registrationForm.verifyFieldErrorMessageByText('Last name required');
            await expect(registrationForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Check wrong data:Input with invalid characters (numbers)', async () => {

            await registrationForm.enterLastName('123');
            await registrationForm.triggerErrorOnLastName('lastName');
            await registrationForm.verifyFieldErrorMessageByText('Last name is invalid');
            await expect(registrationForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Check wrong data:Input with invalid characters (Cyrillic letters)', async () => {

            await registrationForm.enterLastName('Колосок');
            await registrationForm.triggerErrorOnLastName('lastName');
            await registrationForm.verifyFieldErrorMessageByText('Last name is invalid');
            await expect(registrationForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        
        test('Check wrong length: less than 2 characters', async () => {

            await registrationForm.enterLastName('V');
            await registrationForm.triggerErrorOnLastName('lastName');
            await registrationForm.verifyFieldErrorMessageByText('Last name has to be from 2 to 20 characters long');
            await expect(registrationForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Check wrong length: more than 20 characters', async () => {

            await registrationForm.enterLastName('Vqwertyqwqwqwqwqwqwqwqwq');
            await registrationForm.triggerErrorOnLastName('lastNme');
            await registrationForm.verifyFieldErrorMessageByText('Last name has to be from 2 to 20 characters long');
            await expect(registrationForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

    });
    ////Поле Email//////////////////////////////////////////////////////////////////
    test.describe('Check field "Email"', () => {
        
    
        test('Check empty field', async () => {

            await registrationForm.triggerErrorOnEmail('email');
            await registrationForm.verifyFieldErrorMessageByText('Email required');
            await expect(registrationForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Check wrong data:Input with incorrect email', async () => {

            await registrationForm.enterEmail('email@email');
            await registrationForm.triggerErrorOnEmail('email');
            await registrationForm.verifyFieldErrorMessageByText('Email is incorrect');
            await expect(registrationForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        
    });

    ////Поле "Password" //////////////////////////////////////////////////////////////////
    test.describe('Check field "Password"', () => {
        
    
        test('Check empty field', async () => {

            await registrationForm.triggerErrorOnPassword('password');
            await registrationForm.verifyFieldErrorMessageByText('Password required');
            await expect(registrationForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Check wrong data: length less than 8 characters', async () => {

            await registrationForm.enterPassword('123');
            await registrationForm.triggerErrorOnPassword('password');
            await registrationForm.verifyFieldErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(registrationForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Check wrong data: length more than 15 characters', async () => {

            await registrationForm.enterPassword('123456789101234567');
            await registrationForm.triggerErrorOnPassword('password');
            await registrationForm.verifyFieldErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(registrationForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Check wrong data: without integer symbol', async () => {

            await registrationForm.enterPassword('Qwertyuiop');
            await registrationForm.triggerErrorOnPassword('password');
            await registrationForm.verifyFieldErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(registrationForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Check wrong data: without capital letter ', async () => {

            await registrationForm.enterPassword('1wertyuiop');
            await registrationForm.triggerErrorOnPassword('password');
            await registrationForm.verifyFieldErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(registrationForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Check wrong data: without small letter', async () => {

            await registrationForm.enterPassword('1QWERTQWQ');
            await registrationForm.triggerErrorOnPassword('password');
            await registrationForm.verifyFieldErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(registrationForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

    
    });

    ////Поле Re-enter password//////////////////////////////////////////////////////////////////
    test.describe('Check field "Re-enter password"', () => {
        
    
        test('Check empty field', async () => {

            await registrationForm.triggerErrorOnReEnterPassword('repassword');
            await registrationForm.verifyFieldErrorMessageByText('Re-enter password required');
            await expect(registrationForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Check wrong data: length less than 8 characters', async () => {

            await registrationForm.enterRepeatPassword('123');
            await registrationForm.triggerErrorOnReEnterPassword('repassword');
            await registrationForm.verifyFieldErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(registrationForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Check wrong data: length more than 15 characters', async () => {

            await registrationForm.enterRepeatPassword('123456789101234567');
            await registrationForm.triggerErrorOnReEnterPassword('repassword');
            await registrationForm.verifyFieldErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(registrationForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Check wrong data: without integer symbol', async () => {

            await registrationForm.enterRepeatPassword('Qwertyuiop');
            await registrationForm.triggerErrorOnReEnterPassword('repassword');
            await registrationForm.verifyFieldErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(registrationForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Check wrong data: without capital letter ', async () => {

            await registrationForm.enterRepeatPassword('1wertyuiop');
            await registrationForm.triggerErrorOnReEnterPassword('repassword');
            await registrationForm.verifyFieldErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(registrationForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Check wrong data: without small letter', async () => {

            await registrationForm.enterRepeatPassword('1QWERTQWQ');
            await registrationForm.triggerErrorOnReEnterPassword('password');
            await registrationForm.verifyFieldErrorMessageByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(registrationForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

    
    });
 

    //успешная регистрация, кнопка регистрации и негативные сценарии

    //успешная регистрация

    test.describe('Check registration and Register button', () => {
        
            
        test('Check Successful registration', async ({ page }) => {  
            
            const email = `aqa_user.email+${Date.now()}@gmail.com`;
            await registrationForm.successfulRegistration('User','LastName', email,'Qwerty1234567','Qwerty1234567');
            await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
                     
           
        });

         //Кнопка регистрации disabled при некорректных данных

        test('Check the "Register" button is disabled if data incorrect', async ({ page }) => {  
            
            const email = `aqa_user.email+${Date.now()}@gmail.com`;
            await registrationForm.unSuccessfulRegistration('User','LastName', email,'Qwerty1234567','Qwerty');
            await registrationForm.verifyRegisterButtonDisabled();
                
           
        });
    

    
    }); 

    //Негативные сценарии

    test.describe('Check negative scenarios', () => {
        
            
        test('Check registration with incorrect email', async ({ page }) => {  
            
            const email = `aqa_user.email+${Date.now()}@gmail`;
            await registrationForm.unSuccessfulRegistration('User','LastName', email,'Qwerty1234567','Qwerty1234567');
            await registrationForm.verifyRegisterButtonDisabled();                
           
        });

        test('Check registration without Last name', async ({ page }) => {  
            
            const email = `aqa_user.email+${Date.now()}@gmail`;
            await registrationForm.unSuccessfulRegistration('User','', email,'Qwerty1234567','Qwerty1234567');
            await registrationForm.verifyRegisterButtonDisabled();                
           
        });

        test('Check registration with incorrect password', async ({ page }) => {  
            
            const email = `aqa_user.email+${Date.now()}@gmail`;
            await registrationForm.unSuccessfulRegistration('User','LastName', email,'werty1234567','werty1234567');
            await registrationForm.verifyRegisterButtonDisabled();                
           
        });

        test('Check registration with mismatched passwords', async ({ page }) => {  
            
            const email = `aqa_user.email+${Date.now()}@gmail`;
            await registrationForm.unSuccessfulRegistration('User','LastName', email,'Qwerty1234567','Qwerty123456');
            await registrationForm.triggerErrorOnReEnterPassword('password');
            await registrationForm.verifyRegisterButtonDisabled();                
           
        });

        test('Check registration with existing user email', async ({ page }) => {  
            
            const email = `123qwer@qwerty3.qwe`;
            await registrationForm.successfulRegistration('User','LastName', email,'Qwerty1234567','Qwerty1234567');
            await expect(registrationForm.formErrorMessage).toHaveText('User already exists');
                                  
           
        });
    
    
    }); 

});
            