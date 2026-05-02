/** 
 * Test Case: Login with Valid Credentials 
 */ 

import { test, expect } from '@playwright/test'; 
import { HomePage } from '../Pages/HomePage'; 
import { LoginPage } from '../Pages/LoginPage'; 
// १. फाईलचे नाव Myaccount आहे म्हणून पाथ बदलला
import { MyAccountPage } from '../Pages/MyAccount'; 
import { TestConfig } from '../test.config'; 

let config: TestConfig; 
let homePage: HomePage; 
let loginPage: LoginPage; 
// २. इकडे प्रकार (Type) MyAccountPage ठेवा
let myAccountPage: MyAccountPage; 

test.beforeEach(async ({ page }) => { 
    config = new TestConfig(); 
    await page.goto(config.appUrl); 

    homePage = new HomePage(page); 
    loginPage = new LoginPage(page); 
    // ३. इथे सुद्धा क्लासचे नाव MyAccountPage वापरा
    myAccountPage = new MyAccountPage(page); 
}); 

test.afterEach(async ({ page }) => { 
    await page.close(); 
}); 

test('User login test @smoke' , async () => {   // npx playwright test --grep @smoke or npx playwright test --grep "@smoke|@sanity"
    await homePage.clickMyAccount(); 
    await homePage.clickLogin(); 

    await loginPage.setEmail(config.email); 
    await loginPage.setPassword(config.password); 
    await loginPage.clickLogin(); 

    // ४. व्हेरिएबलचे नाव myAccountPage वापरले आहे
    const isLoggedIn = await myAccountPage.isMyAccountPageExists(); 
    expect(isLoggedIn).toBeTruthy(); 
});
