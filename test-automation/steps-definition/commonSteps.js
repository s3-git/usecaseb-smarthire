const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { getLocators } = require('../util/common');

// Common navigation steps
Given('I am on the {string} page', async function (pageName) {
  const url = this.getPageUrl(pageName);
  await this.page.goto(url);
  await this.page.waitForLoadState('networkidle');
});

Given('I navigate to {string}', async function (url) {
  await this.page.goto(url);
  await this.page.waitForLoadState('networkidle');
});

// Common interaction steps
When('I click on {string}', async function (elementDescription) {
  const locator = await this.getElementLocator(elementDescription);
  await this.page.click(locator);
});

When('I click on the {string} button', async function (buttonType) {
  const locators = getLocators('common');
  const locator = locators.button[buttonType] || locators.button.primary;
  await this.page.click(locator);
});

When('I fill in {string} with {string}', async function (fieldDescription, value) {
  const locator = await this.getElementLocator(fieldDescription);
  await this.page.fill(locator, value);
});

When('I select {string} from {string}', async function (option, dropdownDescription) {
  const locator = await this.getElementLocator(dropdownDescription);
  await this.page.selectOption(locator, option);
});

When('I check the {string} checkbox', async function (checkboxDescription) {
  const locator = await this.getElementLocator(checkboxDescription);
  await this.page.check(locator);
});

When('I uncheck the {string} checkbox', async function (checkboxDescription) {
  const locator = await this.getElementLocator(checkboxDescription);
  await this.page.uncheck(locator);
});

When('I hover over {string}', async function (elementDescription) {
  const locator = await this.getElementLocator(elementDescription);
  await this.page.hover(locator);
});

When('I scroll to {string}', async function (elementDescription) {
  const locator = await this.getElementLocator(elementDescription);
  await this.page.locator(locator).scrollIntoViewIfNeeded();
});

// Common assertion steps
Then('I should see {string}', async function (text) {
  await expect(this.page.locator(`text=${text}`)).toBeVisible();
});

Then('I should not see {string}', async function (text) {
  await expect(this.page.locator(`text=${text}`)).not.toBeVisible();
});

Then('I should see the {string} element', async function (elementDescription) {
  const locator = await this.getElementLocator(elementDescription);
  await expect(this.page.locator(locator)).toBeVisible();
});

Then('I should not see the {string} element', async function (elementDescription) {
  const locator = await this.getElementLocator(elementDescription);
  await expect(this.page.locator(locator)).not.toBeVisible();
});

Then('the {string} field should contain {string}', async function (fieldDescription, expectedValue) {
  const locator = await this.getElementLocator(fieldDescription);
  await expect(this.page.locator(locator)).toHaveValue(expectedValue);
});

Then('the {string} checkbox should be checked', async function (checkboxDescription) {
  const locator = await this.getElementLocator(checkboxDescription);
  await expect(this.page.locator(locator)).toBeChecked();
});

Then('the {string} checkbox should not be checked', async function (checkboxDescription) {
  const locator = await this.getElementLocator(checkboxDescription);
  await expect(this.page.locator(locator)).not.toBeChecked();
});

Then('I should be on the {string} page', async function (pageName) {
  const expectedUrl = this.getPageUrl(pageName);
  await expect(this.page).toHaveURL(expectedUrl);
});

Then('the page title should be {string}', async function (expectedTitle) {
  await expect(this.page).toHaveTitle(expectedTitle);
});

Then('I should see an error message', async function () {
  const locators = getLocators('common');
  await expect(this.page.locator(locators.errorMessage)).toBeVisible();
});

Then('I should see a success message', async function () {
  const locators = getLocators('common');
  await expect(this.page.locator(locators.successMessage)).toBeVisible();
});

// Common waiting steps
When('I wait for {int} seconds', async function (seconds) {
  await this.page.waitForTimeout(seconds * 1000);
});

When('I wait for the page to load', async function () {
  await this.page.waitForLoadState('networkidle');
});

When('I wait for {string} to be visible', async function (elementDescription) {
  const locator = await this.getElementLocator(elementDescription);
  await this.page.waitForSelector(locator, { state: 'visible' });
});

When('I wait for {string} to disappear', async function (elementDescription) {
  const locator = await this.getElementLocator(elementDescription);
  await this.page.waitForSelector(locator, { state: 'hidden' });
});
