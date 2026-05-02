import {test , expect} from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { RegistrationPage } from '../Pages/RegistrationPage';
import { RandomDataUtil } from '../Utility/RandomdataGenrator';
import { TestConfig } from '../test.config';

test('User registration test @sanity',async({page})=>{

    const config=new TestConfig();
    await page.goto(config.appUrl); //Navigate to application URL

    //Go to 'My Account' and click 'Register'
    const homePage=new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    //Fill in registration details with random data
    const registrationPage=new RegistrationPage(page);

    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());
    await registrationPage.setEmail(RandomDataUtil.getEmail());
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    const password= RandomDataUtil.getPassword();
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);

    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    //Validate the confirmation message

    const confirmationMsg=await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');

    await page.waitForTimeout(3000);

})
