import { Page, Locator, expect } from '@playwright/test';
import { LogoutPage } from './LogoutPage'; // LogoutPage import केली आहे

export class MyAccountPage {
    private readonly page: Page;

    // Locators using CSS selectors
    private readonly msgHeading: Locator;
    private readonly lnkLogout: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.msgHeading = page.locator('h2:has-text("My Account")');
        this.lnkLogout = page.locator('text="Logout"').nth(1);
    }

    /**
     * Verifies if My Account page is displayed
     * @returns Promise<boolean> - Returns true if heading is visible
     */
    async isMyAccountPageExists(): Promise<boolean> {
        try {
            const isVisible = await this.msgHeading.isVisible();
            return isVisible;
        } catch (error) {
            console.log(`Error checking My Account page heading visibility: ${error}`);
            return false;
        }
    }

    /**
     * Clicks on Logout link
     * @returns Promise<LogoutPage> - Returns instance of LogoutPage
     */
    async clickLogout(): Promise<LogoutPage> {
        try {
            await this.lnkLogout.click();
            return new LogoutPage(this.page);
        } catch (error) {
            console.log(`Unable to click Logout link: ${error}`);
            throw error; // Re-throw the error to fail the test
        }
    }

    /**
     * Alternative method to return page title
     * @returns Promise<string> - Returns the page title text
     */
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }
}
