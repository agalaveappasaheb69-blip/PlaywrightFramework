import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { RegistrationPage } from '../Pages/RegistrationPage';
import { RandomDataUtil } from '../Utility/RandomdataGenrator';
import { TestConfig } from '../test.config';

// Variables declare केले जे सर्व टेस्टमध्ये वापरता येतील
let homePage: HomePage;
let registrationPage: RegistrationPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
    const config = new TestConfig();
    await page.goto(config.appUrl); // Application URL वर जाण्यासाठी

    // Page Objects initialize केले
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
});

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000); // ३ सेकंद थांबण्यासाठी
    await page.close(); // पेज बंद करण्यासाठी
});

test('User registration test', async () => {
    // आता इथे पुन्हा initialization करण्याची गरज नाही, थेट steps लिहा

    // 'My Account' वर जाऊन 'Register' क्लिक करा
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    // Random data वापरून माहिती भरा
    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());
    await registrationPage.setEmail(RandomDataUtil.getEmail());
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    const password = RandomDataUtil.getPassword();
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);

    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    // Confirmation message तपासा
    const confirmationMsg = await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');
});
