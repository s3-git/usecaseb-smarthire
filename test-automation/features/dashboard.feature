Feature: Dashboard
  As a logged-in user
  I want to access and interact with the dashboard
  So that I can manage my account and view important information

  Background:
    Given I am logged in and on the dashboard

  Scenario: View dashboard elements
    Then I should see the dashboard sidebar
    And I should see the dashboard header
    And I should see the main content area
    And I should see the quick actions section
    And I should see the dashboard widgets
    And I should see the stats cards
    And I should see the recent activity section

  Scenario: Navigate using sidebar menu
    When I click on the "Profile" menu item
    Then I should be on the profile page
    Given I am logged in and on the dashboard
    When I click on the "Settings" menu item
    Then I should be on the settings page

  Scenario: View notifications
    Then I should see the notification bell
    When I click on the notification bell
    Then I should see the notifications

  Scenario: Use quick actions
    When I click on the "Create New" quick action button
    Then I should be on the create page
    Given I am logged in and on the dashboard
    When I click on the "View Reports" quick action button
    Then I should be on the reports page

  Scenario: Search functionality
    When I search for "test search"
    Then the dashboard should display "test search"

  Scenario: Filter data
    When I select "This Month" from the filter dropdown
    Then the dashboard should display filtered results

  Scenario: Refresh dashboard data
    When I click the refresh button
    Then I should see the dashboard widgets

  Scenario: Export data
    When I click the export button
    Then I should see a success message

  Scenario: View user information
    Then I should see the user information

  Scenario: Widget interactions
    When I hover over the "Sales Overview" widget
    Then the "Sales Overview" widget should be visible
    When I hover over the "Recent Activity" widget
    Then the "Recent Activity" widget should be visible

  Scenario: Dashboard responsiveness
    Given I am logged in and on the dashboard
    When I resize the browser window to mobile size
    Then I should see the dashboard sidebar
    And I should see the main content area
