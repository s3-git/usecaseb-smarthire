const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { getLocators } = require('../util/common');

// Home page specific steps
Given('I am on the home page', async function () {
  await this.page.goto('/');
  await this.page.waitForLoadState('networkidle');
});

When('I click the CTA button', async function () {
  const locators = getLocators('home');
  await this.page.click(locators.home.ctaButton);
});

When('I scroll to the feature cards section', async function () {
  const locators = getLocators('home');
  await this.page.locator(locators.home.featureCards).scrollIntoViewIfNeeded();
});

When('I scroll to the stats section', async function () {
  const locators = getLocators('home');
  await this.page.locator(locators.home.statsSection).scrollIntoViewIfNeeded();
});

When('I scroll to the newsletter signup', async function () {
  const locators = getLocators('home');
  await this.page.locator(locators.home.newsletterSignup).scrollIntoViewIfNeeded();
});

When('I enter my email {string} in the newsletter signup', async function (email) {
  const locators = getLocators('home');
  await this.page.fill(locators.home.emailInput, email);
});

When('I click the subscribe button', async function () {
  const locators = getLocators('home');
  await this.page.click(locators.home.subscribeButton);
});

When('I click on the {string} feature card', async function (featureName) {
  const locators = getLocators('home');
  const featureCardLocator = `${locators.home.featureCard}:has-text("${featureName}")`;
  await this.page.click(featureCardLocator);
});

Then('I should see the hero section', async function () {
  const locators = getLocators('home');
  await expect(this.page.locator(locators.home.heroSection)).toBeVisible();
});

Then('I should see the hero title', async function () {
  const locators = getLocators('home');
  await expect(this.page.locator(locators.home.heroTitle)).toBeVisible();
});

Then('I should see the hero subtitle', async function () {
  const locators = getLocators('home');
  await expect(this.page.locator(locators.home.heroSubtitle)).toBeVisible();
});

Then('I should see the CTA button', async function () {
  const locators = getLocators('home');
  await expect(this.page.locator(locators.home.ctaButton)).toBeVisible();
});

Then('I should see the feature cards section', async function () {
  const locators = getLocators('home');
  await expect(this.page.locator(locators.home.featureCards)).toBeVisible();
});

Then('I should see at least {int} feature cards', async function (expectedCount) {
  const locators = getLocators('home');
  const featureCards = this.page.locator(locators.home.featureCard);
  await expect(featureCards).toHaveCount({ min: expectedCount });
});

Then('I should see the stats section', async function () {
  const locators = getLocators('home');
  await expect(this.page.locator(locators.home.statsSection)).toBeVisible();
});

Then('I should see at least {int} stat items', async function (expectedCount) {
  const locators = getLocators('home');
  const statItems = this.page.locator(locators.home.statItem);
  await expect(statItems).toHaveCount({ min: expectedCount });
});

Then('I should see the newsletter signup section', async function () {
  const locators = getLocators('home');
  await expect(this.page.locator(locators.home.newsletterSignup)).toBeVisible();
});

Then('I should see the email input field', async function () {
  const locators = getLocators('home');
  await expect(this.page.locator(locators.home.emailInput)).toBeVisible();
});

Then('I should see the subscribe button', async function () {
  const locators = getLocators('home');
  await expect(this.page.locator(locators.home.subscribeButton)).toBeVisible();
});

Then('the hero title should contain {string}', async function (expectedText) {
  const locators = getLocators('home');
  await expect(this.page.locator(locators.home.heroTitle)).toContainText(expectedText);
});

Then('the hero subtitle should contain {string}', async function (expectedText) {
  const locators = getLocators('home');
  await expect(this.page.locator(locators.home.heroSubtitle)).toContainText(expectedText);
});

Then('the CTA button should contain {string}', async function (expectedText) {
  const locators = getLocators('home');
  await expect(this.page.locator(locators.home.ctaButton)).toContainText(expectedText);
});

Then('I should see a feature card with title {string}', async function (expectedTitle) {
  const locators = getLocators('home');
  const featureCardTitle = `${locators.home.featureCardTitle}:has-text("${expectedTitle}")`;
  await expect(this.page.locator(featureCardTitle)).toBeVisible();
});

Then('I should see a stat item with value {string}', async function (expectedValue) {
  const locators = getLocators('home');
  const statValue = `${locators.home.statValue}:has-text("${expectedValue}")`;
  await expect(this.page.locator(statValue)).toBeVisible();
});

Then('I should see a stat item with label {string}', async function (expectedLabel) {
  const locators = getLocators('home');
  const statLabel = `${locators.home.statLabel}:has-text("${expectedLabel}")`;
  await expect(this.page.locator(statLabel)).toBeVisible();
});

When('I hover over the {string} feature card', async function (featureName) {
  const locators = getLocators('home');
  const featureCardLocator = `${locators.home.featureCard}:has-text("${featureName}")`;
  await this.page.hover(featureCardLocator);
});

When('I hover over the {string} stat item', async function (statLabel) {
  const locators = getLocators('home');
  const statItemLocator = `${locators.home.statItem}:has-text("${statLabel}")`;
  await this.page.hover(statItemLocator);
});
