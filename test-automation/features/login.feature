Feature: User Login
  As a user
  I want to be able to login to the application
  So that I can access my account and dashboard

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I login with valid credentials
    Then I should be redirected to the dashboard
    And I should see a login success message

  Scenario: Failed login with invalid credentials
    When I login with invalid credentials
    Then I should see a login error message
    And I should remain on the login page

  Scenario: Login with empty username
    When I enter password "password123"
    And I click the login button
    Then I should see a login error message

  Scenario: Login with empty password
    When I enter username "testuser@example.com"
    And I click the login button
    Then I should see a login error message

  Scenario: Login with remember me option
    When I enter username "testuser@example.com"
    And I enter password "password123"
    And I check the remember me checkbox
    And I click the login button
    Then I should be redirected to the dashboard
    And the remember me checkbox should be checked

  Scenario: Navigate to forgot password
    When I click the forgot password link
    Then I should be on the forgot password page

  Scenario: Navigate to registration page
    When I click the register link
    Then I should be on the registration page

  Scenario: Social login with Google
    When I click the Google login button
    Then I should be redirected to Google OAuth

  Scenario: Social login with Facebook
    When I click the Facebook login button
    Then I should be redirected to Facebook OAuth

  Scenario: Login form validation
    Given I am on the login page
    Then I should see the login form
    And the username field should be empty
    And the password field should be empty
    And the remember me checkbox should not be checked
    And I should see the social login buttons
