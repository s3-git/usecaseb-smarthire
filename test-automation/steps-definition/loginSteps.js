const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { getLocators } = require('../util/common');

// Login specific steps
Given('I am on the login page', async function () {
  await this.page.goto('/login');
  await this.page.waitForLoadState('networkidle');
});

When('I enter username {string}', async function (username) {
  const locators = getLocators('login');
  await this.page.fill(locators.login.usernameField, username);
});

When('I enter password {string}', async function (password) {
  const locators = getLocators('login');
  await this.page.fill(locators.login.passwordField, password);
});

When('I click the login button', async function () {
  const locators = getLocators('login');
  await this.page.click(locators.login.loginButton);
});

When('I click the forgot password link', async function () {
  const locators = getLocators('login');
  await this.page.click(locators.login.forgotPasswordLink);
});

When('I check the remember me checkbox', async function () {
  const locators = getLocators('login');
  await this.page.check(locators.login.rememberMeCheckbox);
});

When('I click the register link', async function () {
  const locators = getLocators('login');
  await this.page.click(locators.login.registerLink);
});

When('I login with username {string} and password {string}', async function (username, password) {
  const locators = getLocators('login');
  await this.page.fill(locators.login.usernameField, username);
  await this.page.fill(locators.login.passwordField, password);
  await this.page.click(locators.login.loginButton);
});

When('I login with valid credentials', async function () {
  const locators = getLocators('login');
  await this.page.fill(locators.login.usernameField, 'testuser@example.com');
  await this.page.fill(locators.login.passwordField, 'password123');
  await this.page.click(locators.login.loginButton);
});

When('I login with invalid credentials', async function () {
  const locators = getLocators('login');
  await this.page.fill(locators.login.usernameField, 'invalid@example.com');
  await this.page.fill(locators.login.passwordField, 'wrongpassword');
  await this.page.click(locators.login.loginButton);
});

Then('I should see the login form', async function () {
  const locators = getLocators('login');
  await expect(this.page.locator(locators.login.form)).toBeVisible();
});

Then('I should see a login error message', async function () {
  const locators = getLocators('login');
  await expect(this.page.locator(locators.login.errorMessage)).toBeVisible();
});

Then('I should see a login success message', async function () {
  const locators = getLocators('login');
  await expect(this.page.locator(locators.login.successMessage)).toBeVisible();
});

Then('I should be redirected to the dashboard', async function () {
  await expect(this.page).toHaveURL(/.*dashboard.*/);
});

Then('the username field should be empty', async function () {
  const locators = getLocators('login');
  await expect(this.page.locator(locators.login.usernameField)).toHaveValue('');
});

Then('the password field should be empty', async function () {
  const locators = getLocators('login');
  await expect(this.page.locator(locators.login.passwordField)).toHaveValue('');
});

Then('the remember me checkbox should be checked', async function () {
  const locators = getLocators('login');
  await expect(this.page.locator(locators.login.rememberMeCheckbox)).toBeChecked();
});

Then('the remember me checkbox should not be checked', async function () {
  const locators = getLocators('login');
  await expect(this.page.locator(locators.login.rememberMeCheckbox)).not.toBeChecked();
});

Then('I should see the social login buttons', async function () {
  const locators = getLocators('login');
  await expect(this.page.locator(locators.login.socialLogin.googleButton)).toBeVisible();
  await expect(this.page.locator(locators.login.socialLogin.facebookButton)).toBeVisible();
});

When('I click the Google login button', async function () {
  const locators = getLocators('login');
  await this.page.click(locators.login.socialLogin.googleButton);
});

When('I click the Facebook login button', async function () {
  const locators = getLocators('login');
  await this.page.click(locators.login.socialLogin.facebookButton);
});
