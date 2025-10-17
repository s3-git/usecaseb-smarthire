# Test Automation Project

This project provides end-to-end automation testing using Playwright and Cucumber with JavaScript.

## Project Structure

```
test-automation/
├── locators/                 # CSS selectors and XPath locators
│   ├── common.json          # Common locators used across pages
│   ├── home.json            # Home page specific locators
│   ├── login.json           # Login page specific locators
│   └── dashboard.json       # Dashboard page specific locators
├── steps-definition/        # Step definition files
│   ├── commonSteps.js       # Reusable step definitions
│   ├── loginSteps.js        # Login specific steps
│   ├── dashboardSteps.js    # Dashboard specific steps
│   └── homeSteps.js         # Home page specific steps
├── features/                # Gherkin feature files
│   ├── login.feature        # Login functionality tests
│   ├── dashboard.feature    # Dashboard functionality tests
│   └── home.feature         # Home page functionality tests
├── util/                    # Utility files
│   ├── hook.js              # Cucumber hooks for setup/teardown
│   ├── common.js            # Common utility functions
│   ├── global-setup.js      # Global test setup
│   └── global-teardown.js   # Global test teardown
├── reports/                 # Test reports (generated)
├── screenshots/             # Screenshots on test failure (generated)
├── package.json             # Project dependencies and scripts
├── playwright.config.js     # Playwright configuration
├── cucumber.config.js       # Cucumber configuration
└── .gitignore              # Git ignore file
```

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npm run playwright:install
```

## Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
BASE_URL=http://localhost:3000
BROWSER=chromium
HEADLESS=true
DEBUG=false
SLOW_MO=0
```

### Available Browsers
- `chromium` (default)
- `firefox`
- `webkit`

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

### Run tests with debug output
```bash
npm run test:debug
```

### Run tests on specific browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Run tests on mobile/tablet viewports
```bash
npm run test:mobile
npm run test:tablet
```

### Run specific test suites
```bash
npm run test:login
npm run test:dashboard
npm run test:home
```

### Run tests by tags
```bash
npm run test:smoke
npm run test:regression
```

### Run tests in parallel
```bash
npm run test:parallel
```

### Generate test reports
```bash
npm run test:report
```

## Writing Tests

### Feature Files

Feature files are written in Gherkin syntax and should be placed in the `features/` directory.

Example:
```gherkin
Feature: User Login
  As a user
  I want to be able to login to the application
  So that I can access my account

  Scenario: Successful login
    Given I am on the login page
    When I login with valid credentials
    Then I should be redirected to the dashboard
```

### Step Definitions

Step definitions are JavaScript files that implement the steps defined in feature files. They should be placed in the `steps-definition/` directory.

Example:
```javascript
const { Given, When, Then } = require('@cucumber/cucumber');

Given('I am on the login page', async function () {
  await this.page.goto('/login');
});
```

### Locators

Locators are stored in JSON files in the `locators/` directory. Each page should have its own locator file.

Example:
```json
{
  "login": {
    "usernameField": "#username",
    "passwordField": "#password",
    "loginButton": ".login-button"
  }
}
```

## Utilities

### Common Functions

The `util/common.js` file provides helper functions:

- `getLocators(pageName)` - Load locators for a specific page
- `getPageUrl(pageName)` - Get URL for a specific page
- `generateTestData(type)` - Generate random test data
- `waitForElement(page, selector)` - Wait for element to be visible
- `takeScreenshot(page, name)` - Take screenshot with timestamp

### Hooks

The `util/hook.js` file provides Cucumber hooks for:

- Browser setup and teardown
- Page creation and cleanup
- Screenshot capture on failure
- Console logging

## Test Reports

Test reports are generated in the `reports/` directory:

- `cucumber_report.html` - HTML report
- `cucumber_report.json` - JSON report
- `playwright-report/` - Playwright HTML report

## Screenshots and Videos

- Screenshots are automatically captured on test failure
- Videos are recorded for failed tests
- All artifacts are stored in the `screenshots/` and `videos/` directories

## Best Practices

1. **Locators**: Use descriptive names and organize them by page
2. **Step Definitions**: Keep steps reusable and maintainable
3. **Feature Files**: Write clear, readable scenarios
4. **Utilities**: Use helper functions for common operations
5. **Reports**: Review test reports regularly to identify issues

## Troubleshooting

### Common Issues

1. **Browser not found**: Run `npm run playwright:install`
2. **Tests timing out**: Increase timeout values in configuration
3. **Element not found**: Check locators and page loading
4. **Screenshots not generated**: Ensure `screenshots/` directory exists

### Debug Mode

Enable debug mode to see detailed logs:
```bash
DEBUG=true npm test
```

## Contributing

1. Follow the existing code structure
2. Add appropriate tests for new features
3. Update documentation as needed
4. Ensure all tests pass before submitting

## License

MIT License
