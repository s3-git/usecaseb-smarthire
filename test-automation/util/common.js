const fs = require('fs');
const path = require('path');

/**
 * Load locators from JSON files
 * @param {string} pageName - Name of the page (e.g., 'home', 'login', 'dashboard')
 * @returns {Object} Locators object for the specified page
 */
function getLocators(pageName) {
  try {
    const locatorPath = path.join(__dirname, '..', 'locators', `${pageName}.json`);
    
    if (!fs.existsSync(locatorPath)) {
      console.warn(`Locator file not found: ${locatorPath}`);
      return {};
    }
    
    const locatorData = fs.readFileSync(locatorPath, 'utf8');
    return JSON.parse(locatorData);
  } catch (error) {
    console.error(`Error loading locators for ${pageName}:`, error.message);
    return {};
  }
}

/**
 * Get page URL based on page name
 * @param {string} pageName - Name of the page
 * @returns {string} Full URL for the page
 */
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

/**
 * Get element locator based on description
 * @param {string} elementDescription - Description of the element
 * @returns {string} CSS selector or XPath for the element
 */
function getElementLocator(elementDescription) {
  const locatorMap = {
    'username field': '#username',
    'password field': '#password',
    'email field': 'input[type="email"]',
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
    'success message': '.success-message',
    'modal': '.modal',
    'form': 'form',
    'table': 'table',
    'dropdown': 'select',
    'checkbox': 'input[type="checkbox"]',
    'radio button': 'input[type="radio"]',
    'link': 'a',
    'button': 'button',
    'input': 'input',
    'textarea': 'textarea'
  };
  
  return locatorMap[elementDescription.toLowerCase()] || elementDescription;
}

/**
 * Generate random test data
 * @param {string} type - Type of data to generate ('email', 'username', 'password', 'name')
 * @returns {string} Generated test data
 */
function generateTestData(type) {
  const timestamp = Date.now();
  
  switch (type.toLowerCase()) {
    case 'email':
      return `testuser${timestamp}@example.com`;
    case 'username':
      return `testuser${timestamp}`;
    case 'password':
      return `TestPassword${timestamp}`;
    case 'name':
      return `Test User ${timestamp}`;
    case 'phone':
      return `555-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    default:
      return `test${timestamp}`;
  }
}

/**
 * Wait for element to be visible
 * @param {Object} page - Playwright page object
 * @param {string} selector - CSS selector or XPath
 * @param {number} timeout - Timeout in milliseconds (default: 30000)
 * @returns {Promise<void>}
 */
async function waitForElement(page, selector, timeout = 30000) {
  try {
    await page.waitForSelector(selector, { state: 'visible', timeout });
  } catch (error) {
    throw new Error(`Element ${selector} not visible within ${timeout}ms`);
  }
}

/**
 * Wait for element to be hidden
 * @param {Object} page - Playwright page object
 * @param {string} selector - CSS selector or XPath
 * @param {number} timeout - Timeout in milliseconds (default: 30000)
 * @returns {Promise<void>}
 */
async function waitForElementHidden(page, selector, timeout = 30000) {
  try {
    await page.waitForSelector(selector, { state: 'hidden', timeout });
  } catch (error) {
    throw new Error(`Element ${selector} still visible after ${timeout}ms`);
  }
}

/**
 * Check if element exists on the page
 * @param {Object} page - Playwright page object
 * @param {string} selector - CSS selector or XPath
 * @returns {Promise<boolean>} True if element exists, false otherwise
 */
async function elementExists(page, selector) {
  try {
    await page.waitForSelector(selector, { timeout: 5000 });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get text content of an element
 * @param {Object} page - Playwright page object
 * @param {string} selector - CSS selector or XPath
 * @returns {Promise<string>} Text content of the element
 */
async function getElementText(page, selector) {
  try {
    const element = await page.locator(selector);
    return await element.textContent();
  } catch (error) {
    throw new Error(`Could not get text from element ${selector}`);
  }
}

/**
 * Get attribute value of an element
 * @param {Object} page - Playwright page object
 * @param {string} selector - CSS selector or XPath
 * @param {string} attribute - Attribute name
 * @returns {Promise<string>} Attribute value
 */
async function getElementAttribute(page, selector, attribute) {
  try {
    const element = await page.locator(selector);
    return await element.getAttribute(attribute);
  } catch (error) {
    throw new Error(`Could not get ${attribute} attribute from element ${selector}`);
  }
}

/**
 * Scroll element into view
 * @param {Object} page - Playwright page object
 * @param {string} selector - CSS selector or XPath
 * @returns {Promise<void>}
 */
async function scrollToElement(page, selector) {
  try {
    const element = await page.locator(selector);
    await element.scrollIntoViewIfNeeded();
  } catch (error) {
    throw new Error(`Could not scroll to element ${selector}`);
  }
}

/**
 * Take screenshot with timestamp
 * @param {Object} page - Playwright page object
 * @param {string} name - Name for the screenshot
 * @returns {Promise<string>} Path to the screenshot file
 */
async function takeScreenshot(page, name) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotPath = path.join(__dirname, '..', 'screenshots', `${name}_${timestamp}.png`);
  
  // Ensure screenshots directory exists
  const screenshotsDir = path.dirname(screenshotPath);
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  
  await page.screenshot({ path: screenshotPath, fullPage: true });
  return screenshotPath;
}

/**
 * Clear all cookies and local storage
 * @param {Object} page - Playwright page object
 * @returns {Promise<void>}
 */
async function clearBrowserData(page) {
  await page.context().clearCookies();
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

/**
 * Set viewport size
 * @param {Object} page - Playwright page object
 * @param {number} width - Viewport width
 * @param {number} height - Viewport height
 * @returns {Promise<void>}
 */
async function setViewportSize(page, width, height) {
  await page.setViewportSize({ width, height });
}

/**
 * Simulate mobile device
 * @param {Object} page - Playwright page object
 * @returns {Promise<void>}
 */
async function simulateMobileDevice(page) {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.emulate({
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
  });
}

/**
 * Simulate tablet device
 * @param {Object} page - Playwright page object
 * @returns {Promise<void>}
 */
async function simulateTabletDevice(page) {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.emulate({
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
  });
}

module.exports = {
  getLocators,
  getPageUrl,
  getElementLocator,
  generateTestData,
  waitForElement,
  waitForElementHidden,
  elementExists,
  getElementText,
  getElementAttribute,
  scrollToElement,
  takeScreenshot,
  clearBrowserData,
  setViewportSize,
  simulateMobileDevice,
  simulateTabletDevice
};
