import test, { expect } from "@playwright/test";
//import { credentials } from "../../test-data/usersData";
//
test.describe(('Mocking'), () => {
    test('Verify fake user name in profile', async ({ page }) => {
        await page.goto('/');
        await page.getByText('Sign In').click();

        const fakeResponseBody = { "status": "ok", "data": 
            {
            "photoFilename": "default-user.png",
            "name": "Mykola",
            "lastName": "Lviv" }   
        };

        await page.route('**/api/users/profile', route => route.fulfill ({
        status:200,
        body: JSON.stringify(fakeResponseBody),
         }));

        await page.locator('//input[@id="signinEmail"]').fill('kostenko@mail.com');
        await page.locator('//input[@id="signinPassword"]').fill('Qwerty1234567');
        await page.locator('//div[@class="modal-content"]//button[contains(@class, "btn-primary")]').click();
        await page.locator('.icon-profile').click();
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/profile');       
        await expect(page.getByText('Mykola Lviv')).toBeVisible();
    })
})


test.describe(('Request'), () => {
    test.describe(('Public requests'), () => {

    
        test('Sign in [/api/auth/signin]', async ({ request }) => {
            const responseAuth = await request.post('/api/auth/signin', {
                data: {
                    "email": "kostenko@mail.com",
                    "password": "Qwerty1234567",
                    "remember": false
                }
            });
            const responseAuthJson = await responseAuth.json();
            console.log(await request.storageState())
            console.log(responseAuthJson);

        });
    })
    test.describe(('Private requests'), () => {
        let globalAuthHeader: string;
        test.beforeAll(async ({ request }) => {
            const responseAuth = await request.post('/api/auth/signin', {
                data: {
                    "email": "kostenko@mail.com",
                    "password": "Qwerty1234567",
                    "remember": false
                }
            });
            globalAuthHeader = responseAuth.headers()['set-cookie'].split(';')[0];
            expect(globalAuthHeader).toBeDefined();
        })

        /////positive////////////////
        test('Positive - Add car successfully ', async ({ request }) => {
            const responseCars = await request.post('/api/cars', {
                headers: {
                    'Cookie': globalAuthHeader
                },
                data: {
                    "carBrandId": 2,
                    "carModelId": 7,
                    "mileage": 250
                }
            });
            expect(responseCars.status()).toBe(201)
            console.log(await responseCars.json());
            
        });

        /////////negative//////////////
        test('Negative - Add car without mileage', async ({ request }) => {
            const responseCars = await request.post('/api/cars', {
                headers: {
                    'Cookie': globalAuthHeader
                },
                data: {
                    "carBrandId": 2,
                    "carModelId": 7,
                    //"mileage":200
                }
            });
            expect(responseCars.status()).toBe(400)
            console.log(await responseCars.json());
            
        });

        test('Negative - Add car with incorrect model', async ({ request }) => {
            const responseCars = await request.post('/api/cars', {
                headers: {
                    'Cookie': globalAuthHeader
                },
                data: {
                    "carBrandId": 2,
                    "carModelId": 1,
                    "mileage":200
                }
            });
            expect(responseCars.status()).toBe(404)
            console.log(await responseCars.json());
            
        });
    })
})