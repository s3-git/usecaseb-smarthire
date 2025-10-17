const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const fs = require('fs');
const path = require('path');

let browser;
let context;

// Load locators from JSON files
function loadLocators(pageName) {
  try {
    const locatorPath = path.join(__dirname, '..', 'locators', `${pageName}.json`);
    const locatorData = fs.readFileSync(locatorPath, 'utf8');
    return JSON.parse(locatorData);
  } catch (error) {
    console.error(`Error loading locators for ${pageName}:`, error.message);
    return {};
  }
}

// Get page URL based on page name
function getPageUrl(pageName) {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const pageUrls = {
    'home': baseUrl,
    'login': `${baseUrl}/login`,
    'dashboard': `${baseUrl}/dashboard`,
    'profile': `${baseUrl}/profile`,
    'settings': `${baseUrl}/settings`,
    'registration': `${baseUrl}/register`,
    'forgot password': `${baseUrl}/forgot-password`,
    'features': `${baseUrl}/features`,
    'reports': `${baseUrl}/reports`,
    'create': `${baseUrl}/create`
  };
  return pageUrls[pageName.toLowerCase()] || baseUrl;
}

// Get element locator based on description
function getElementLocator(elementDescription) {
  // This is a simplified implementation
  // In a real project, you might want to implement a more sophisticated mapping
  const locatorMap = {
    'username field': '#username',
    'password field': '#password',
    'login button': '.login-button',
    'submit button': 'button[type="submit"]',
    'cancel button': '.btn-cancel',
    'close button': '.close-button',
    'menu': '.main-menu',
    'sidebar': '.dashboard-sidebar',
    'search bar': '.search-bar',
    'notification bell': '.notification-bell',
    'user profile': '.user-profile',
    'loading spinner': '.loading-spinner',
    'error message': '.error-message',
    'success message': '.success-message'
  };
  
  return locatorMap[elementDescription.toLowerCase()] || elementDescription;
}

BeforeAll(async function () {
  // Set up browser based on environment variable
  const browserType = process.env.BROWSER || 'chromium';
  
  switch (browserType.toLowerCase()) {
    case 'firefox':
      browser = await firefox.launch({
        headless: process.env.HEADLESS === 'true',
        slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0
      });
      break;
    case 'webkit':
      browser = await webkit.launch({
        headless: process.env.HEADLESS === 'true',
        slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0
      });
      break;
    default:
      browser = await chromium.launch({
        headless: process.env.HEADLESS === 'true',
        slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0
      });
  }
});

Before(async function () {
  // Create a new context and page for each scenario
  context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  
  this.page = await context.newPage();
  
  // Add helper methods to the context
  this.getPageUrl = getPageUrl;
  this.getElementLocator = getElementLocator;
  this.loadLocators = loadLocators;
  
  // Set default timeout
  this.page.setDefaultTimeout(30000);
  this.page.setDefaultNavigationTimeout(30000);
  
  // Add console logging for debugging
  this.page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error(`Browser console error: ${msg.text()}`);
    }
  });
  
  // Add request/response logging for debugging
  this.page.on('request', request => {
    if (process.env.DEBUG === 'true') {
      console.log(`Request: ${request.method()} ${request.url()}`);
    }
  });
  
  this.page.on('response', response => {
    if (process.env.DEBUG === 'true') {
      console.log(`Response: ${response.status()} ${response.url()}`);
    }
  });
});

After(async function (scenario) {
  // Take screenshot on failure
  if (scenario.result.status === 'FAILED') {
    const screenshotPath = path.join(__dirname, '..', 'screenshots', `${scenario.pickle.name}_${Date.now()}.png`);
    
    // Ensure screenshots directory exists
    const screenshotsDir = path.dirname(screenshotPath);
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved: ${screenshotPath}`);
  }
  
  // Close the page and context
  if (this.page) {
    await this.page.close();
  }
  if (context) {
    await context.close();
  }
});

AfterAll(async function () {
  // Close the browser
  if (browser) {
    await browser.close();
  }
});

// Export helper functions for use in step definitions
module.exports = {
  loadLocators,
  getPageUrl,
  getElementLocator
};
