import { test, expect } from '@playwright/test';
import { TestConfig } from '../test.config';
import { HomePage } from '../Pages/HomePage';
// तुमच्या फाईलचे नाव 'Searchresultpage' आहे (r आणि p लहान), म्हणून पाथ तसाच हवा
import { SearchResultsPage } from '../Pages/SearchResp'; 
import { ProductPage } from '../Pages/ProductPage';

// Shared instances
let config: TestConfig;
let homePage: HomePage;
let searchResultsPage: SearchResultsPage;
let productPage: ProductPage;

test.beforeEach(async ({ page }) => {
    config = new TestConfig(); // Load test configuration
    await page.goto(config.appUrl); // Step 1: Open application URL

    // Initialize page objects
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
    productPage = new ProductPage(page);
});

test.afterEach(async ({ page }) => {
    await page.close(); // Optional cleanup
});

test('Add product to cart test @master @regression', async ({ page }) => {
    // Step 2: Enter product name in search box
    await homePage.enterProductName(config.productName);

    // Step 3: Click the search button
    await homePage.clickSearch();

    // Step 4: Verify search results page is displayed
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

    // Step 5: Verify that the product exists in the results
    const productName = config.productName;
    expect(await searchResultsPage.isProductExist(productName)).toBeTruthy();

    // Step 6-7: Select product -> Set quantity -> Add to cart
    if (await searchResultsPage.isProductExist(productName)) {
        await searchResultsPage.selectProduct(productName);
        await productPage.setQuantity(config.productQuantity); // Set quantity
        await productPage.addToCart(); // Add to cart
    }

    // Step 8: Assert success message is visible
    expect(await productPage.isConfirmationMessageVisible()).toBeTruthy();
});
