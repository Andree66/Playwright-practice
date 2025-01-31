import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    
    await page.goto('/');    
    await page.locator('.header_signin').click();  
    //await expect(page.locator('.modal-title')).toHaveText('Log in');  
    await page.locator('button:has-text("Registration")').click();  
    //await expect(page.locator('.modal-title')).toHaveText('Registration');
  });


  test.describe('Check field "Name"', () => {

    test('Check empty field', async ({ page }) => {  

        await page.locator('#signupName').focus();
        await page.locator('#signupName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Name required');
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
             
    });

    test('Check wrong data:Input with invalid characters (numbers)', async ({ page }) => {  

        await page.locator('#signupName').fill('123');
        await page.locator('#signupName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Name is invalid');
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Check wrong data:Input with invalid characters (Cyrillic letters)', async ({ page }) => {  

        await page.locator('#signupName').fill('Вася');
        await page.locator('#signupName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Name is invalid');
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });   

    
    test('Check wrong length: less than 2 characters', async ({ page }) => {  

        await page.locator('#signupName').fill('a');
        await page.locator('#signupName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Name has to be from 2 to 20 characters long');
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }); 

    test('Check wrong length: more than 20 characters', async ({ page }) => {  

        await page.locator('#signupName').fill('abcdeqwertyuiopabcdefqq');
        await page.locator('#signupName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Name has to be from 2 to 20 characters long');
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

  })

  test.describe('Check field "Last name"', () => {

    test('Check empty field', async ({ page }) => {  

        await page.locator('#signupLastName').focus();
        await page.locator('#signupLastName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Last name required');
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
             
    });

    test('Check wrong data:Input with invalid characters (numbers)', async ({ page }) => {  

        await page.locator('#signupLastName').fill('123');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Last name is invalid');
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }); 
    
    test('Check wrong data:Input with invalid characters (Cyrillic letters)', async ({ page }) => {  

        await page.locator('#signupLastName').fill('Шевченко');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Last name is invalid');
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
    
    test('Check wrong length: less than 2 characters', async ({ page }) => {  

        await page.locator('#signupLastName').fill('a');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Last name has to be from 2 to 20 characters long');
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }); 

    test('Check wrong length: more than 20 characters', async ({ page }) => {  

        await page.locator('#signupLastName').fill('abcdeqwertyuiopabcdef');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Last name has to be from 2 to 20 characters long');
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

  })

  test.describe('Check field "Email"', () => {

    test('Check empty field', async ({ page }) => {  

        await page.locator('#signupEmail').focus();
        await page.locator('#signupEmail').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Email required');
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
             
    });

    test('Check wrong data', async ({ page }) => {  

        await page.locator('#signupEmail').fill('test@test');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Email is incorrect');
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });      
    

  })

  test.describe('Check field "Password"', () => {

    test('Check empty field', async ({ page }) => {  

        await page.locator('#signupPassword').focus();
        await page.locator('#signupPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Password required');
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
             
    });

    test('Check wrong data: length less than 8 characters', async ({ page }) => {  

        await page.locator('#signupPassword').fill('1234567');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Check wrong data: length more than 15 characters', async ({ page }) => {  

        await page.locator('#signupPassword').fill('1234567890123456');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });       
    
    test('Check wrong data: without integer symbol ', async ({ page }) => {  

        await page.locator('#signupPassword').fill('Qwertyuiop');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }); 

    test('Check wrong data: without capital letter ', async ({ page }) => {  

        await page.locator('#signupPassword').fill('1wertyuiop');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }); 

    test('Check wrong data: without small letter ', async ({ page }) => {  

        await page.locator('#signupPassword').fill('1QWERTQWQ');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }); 
   

  })

  test.describe('Check field "Re-enter password"', () => {

    test('Check empty field', async ({ page }) => {  

        await page.locator('#signupRepeatPassword').focus();
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Re-enter password required');
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
             
    });

    test('Check wrong data: length less than 8 characters', async ({ page }) => {  

        await page.locator('#signupRepeatPassword').fill('1234567');
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Check wrong data: length more than 15 characters', async ({ page }) => {  

        await page.locator('#signupRepeatPassword').fill('1234567890123456');
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });       
    
    test('Check wrong data: without integer symbol ', async ({ page }) => {  

        await page.locator('#signupRepeatPassword').fill('Qwertyuiop');
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }); 

    test('Check wrong data: without capital letter ', async ({ page }) => {  

        await page.locator('#signupRepeatPassword').fill('1wertyuiop');
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }); 

    test('Check wrong data: without small letter ', async ({ page }) => {  

        await page.locator('#signupRepeatPassword').fill('1QWERTQWQ');
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }); 
   

  }) 

  test.describe('Check registration and Register button', () => {
        
    test('Check Successful registration', async ({ page }) => {  
        
        const email = `aqa_user.email+${Date.now()}@gmail.com`;
        await page.locator('#signupName').fill('User');
        await page.locator('#signupLastName').fill('LastName');
        await page.locator('#signupEmail').fill(email);
        await page.locator('#signupPassword').fill('Qwerty1234567');
        await page.locator('#signupRepeatPassword').fill('Qwerty1234567');
        await page.locator('button:has-text("Register")').click();
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');

    });

    test('Check the "Register" button is disabled if data incorrect', async ({ page }) => {  
        
        const email = `aqa_user.email+${Date.now()}@gmail.com`;
        await page.locator('#signupName').fill('User');
        await page.locator('#signupLastName').fill('LastName');
        await page.locator('#signupEmail').fill(email);
        await page.locator('#signupPassword').fill('Qwerty1234567');
        await page.locator('#signupRepeatPassword').fill('Qwert');
        await expect(page.locator('button:has-text("Register")')).toBeDisabled();
       
    });

}) 

test.describe('Check negative scenarios', () => {
        
    test('Check registration with incorrect email', async ({ page }) => {  
        
        const email = `aqa_user.email+${Date.now()}@`;
        await page.locator('#signupName').fill('User');
        await page.locator('#signupLastName').fill('LastName');
        await page.locator('#signupEmail').fill(email);
        await page.locator('#signupPassword').fill('Qwerty1234567');
        await page.locator('#signupRepeatPassword').fill('Qwerty1234567');
        await expect(page.locator('.invalid-feedback')).toHaveText('Email is incorrect');
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(page.locator('button:has-text("Register")')).toBeDisabled(); 

    });

    test('Check registration without Last name', async ({ page }) => {  
        
        const email = `aqa_user.email+${Date.now()}@gmail.com`;
        await page.locator('#signupName').fill('Ivan');
       // await page.locator('#signupLastName').fill('Костенко');
        await page.locator('#signupEmail').fill(email);
        await page.locator('#signupPassword').fill('Qwerty1234567');
        await page.locator('#signupRepeatPassword').fill('Qwerty1234567');
        await expect(page.locator('button:has-text("Register")')).toBeDisabled();
       
    });

    test('Check registration with incorrect password', async ({ page }) => {  
        
        const email = `aqa_user.email+${Date.now()}@gmail.com`;
        await page.locator('#signupName').fill('Ivan');
        await page.locator('#signupLastName').fill('Kostenko');
        await page.locator('#signupEmail').fill(email);
        await page.locator('#signupPassword').fill('Qwertyqqqq');
        await page.locator('#signupRepeatPassword').fill('Qwertyqqqq');
        await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(page.locator('button:has-text("Register")')).toBeDisabled();
       
    });

    test('Check registration with mismatched passwords', async ({ page }) => {  
        
        const email = `aqa_user.email+${Date.now()}@gmail.com`;
        await page.locator('#signupName').fill('Ivan');
        await page.locator('#signupLastName').fill('Kostenko');
        await page.locator('#signupEmail').fill(email);
        await page.locator('#signupPassword').fill('Qwertyqqqq12345');
        await page.locator('#signupRepeatPassword').fill('Qwertyqqqq123');
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Passwords do not match');
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(page.locator('button:has-text("Register")')).toBeDisabled();
       
    });

    
    test('Check registration with existing user email', async ({ page }) => {  
        
        const email = `123qwer@qwerty3.qwe`;
        await page.locator('#signupName').fill('Ivan');
        await page.locator('#signupLastName').fill('Kostenko');
        await page.locator('#signupEmail').fill(email);
        await page.locator('#signupPassword').fill('Qwertyqqqq12345');
        await page.locator('#signupRepeatPassword').fill('Qwertyqqqq12345');
        await page.locator('button:has-text("Register")').click();
        await expect(page.locator('.alert-danger')).toHaveText('User already exists');
        
       
    });

}) 
