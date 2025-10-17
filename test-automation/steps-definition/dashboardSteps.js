const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { getLocators } = require('../util/common');

// Dashboard specific steps
Given('I am logged in and on the dashboard', async function () {
  // Navigate to login page
  await this.page.goto('/login');
  
  // Login with valid credentials
  const loginLocators = getLocators('login');
  await this.page.fill(loginLocators.login.usernameField, 'testuser@example.com');
  await this.page.fill(loginLocators.login.passwordField, 'password123');
  await this.page.click(loginLocators.login.loginButton);
  
  // Wait for redirect to dashboard
  await this.page.waitForURL(/.*dashboard.*/);
});

When('I click on the {string} menu item', async function (menuItem) {
  const locators = getLocators('dashboard');
  const menuItemLocator = `${locators.dashboard.sidebarMenuItem}:has-text("${menuItem}")`;
  await this.page.click(menuItemLocator);
});

When('I click on the notification bell', async function () {
  const locators = getLocators('dashboard');
  await this.page.click(locators.dashboard.notificationBell);
});

When('I click on the {string} quick action button', async function (actionName) {
  const locators = getLocators('dashboard');
  const actionButton = `${locators.dashboard.quickActionButton}:has-text("${actionName}")`;
  await this.page.click(actionButton);
});

When('I search for {string}', async function (searchTerm) {
  const locators = getLocators('dashboard');
  await this.page.fill(locators.dashboard.searchBar, searchTerm);
  await this.page.press(locators.dashboard.searchBar, 'Enter');
});

When('I select {string} from the filter dropdown', async function (filterOption) {
  const locators = getLocators('dashboard');
  await this.page.selectOption(locators.dashboard.filterDropdown, filterOption);
});

When('I click the refresh button', async function () {
  const locators = getLocators('dashboard');
  await this.page.click(locators.dashboard.refreshButton);
});

When('I click the export button', async function () {
  const locators = getLocators('dashboard');
  await this.page.click(locators.dashboard.exportButton);
});

Then('I should see the dashboard sidebar', async function () {
  const locators = getLocators('dashboard');
  await expect(this.page.locator(locators.dashboard.sidebar)).toBeVisible();
});

Then('I should see the dashboard header', async function () {
  const locators = getLocators('dashboard');
  await expect(this.page.locator(locators.dashboard.header)).toBeVisible();
});

Then('I should see the main content area', async function () {
  const locators = getLocators('dashboard');
  await expect(this.page.locator(locators.dashboard.mainContent)).toBeVisible();
});

Then('I should see the quick actions section', async function () {
  const locators = getLocators('dashboard');
  await expect(this.page.locator(locators.dashboard.quickActions)).toBeVisible();
});

Then('I should see the dashboard widgets', async function () {
  const locators = getLocators('dashboard');
  await expect(this.page.locator(locators.dashboard.widgets)).toBeVisible();
});

Then('I should see the stats cards', async function () {
  const locators = getLocators('dashboard');
  await expect(this.page.locator(locators.dashboard.statsCards)).toBeVisible();
});

Then('I should see the recent activity section', async function () {
  const locators = getLocators('dashboard');
  await expect(this.page.locator(locators.dashboard.recentActivity)).toBeVisible();
});

Then('I should see the notification bell', async function () {
  const locators = getLocators('dashboard');
  await expect(this.page.locator(locators.dashboard.notificationBell)).toBeVisible();
});

Then('I should see {int} notifications', async function (expectedCount) {
  const locators = getLocators('dashboard');
  await expect(this.page.locator(locators.dashboard.notificationCount)).toHaveText(expectedCount.toString());
});

Then('I should see the user information', async function () {
  const locators = getLocators('dashboard');
  await expect(this.page.locator(locators.dashboard.userInfo)).toBeVisible();
});

Then('the dashboard should display {string}', async function (content) {
  const locators = getLocators('dashboard');
  await expect(this.page.locator(locators.dashboard.mainContent)).toContainText(content);
});

Then('I should see the search bar', async function () {
  const locators = getLocators('dashboard');
  await expect(this.page.locator(locators.dashboard.searchBar)).toBeVisible();
});

Then('I should see the filter dropdown', async function () {
  const locators = getLocators('dashboard');
  await expect(this.page.locator(locators.dashboard.filterDropdown)).toBeVisible();
});

When('I hover over the {string} widget', async function (widgetName) {
  const locators = getLocators('dashboard');
  const widgetLocator = `${locators.dashboard.widget}:has-text("${widgetName}")`;
  await this.page.hover(widgetLocator);
});

Then('the {string} widget should be visible', async function (widgetName) {
  const locators = getLocators('dashboard');
  const widgetLocator = `${locators.dashboard.widget}:has-text("${widgetName}")`;
  await expect(this.page.locator(widgetLocator)).toBeVisible();
});
