Feature: Home Page
  As a visitor
  I want to view the home page
  So that I can learn about the application and its features

  Background:
    Given I am on the home page

  Scenario: View home page elements
    Then I should see the hero section
    And I should see the hero title
    And I should see the hero subtitle
    And I should see the CTA button
    And I should see the feature cards section
    And I should see the stats section
    And I should see the newsletter signup section

  Scenario: Hero section content
    Then the hero title should contain "Welcome"
    And the hero subtitle should contain "Get started"
    And the CTA button should contain "Get Started"

  Scenario: Feature cards display
    Then I should see at least 3 feature cards
    And I should see a feature card with title "Easy to Use"
    And I should see a feature card with title "Secure"
    And I should see a feature card with title "Fast"

  Scenario: Stats section display
    Then I should see at least 3 stat items
    And I should see a stat item with value "1000+"
    And I should see a stat item with label "Users"
    And I should see a stat item with label "Projects"

  Scenario: Newsletter signup
    Then I should see the email input field
    And I should see the subscribe button
    When I enter my email "test@example.com" in the newsletter signup
    And I click the subscribe button
    Then I should see a success message

  Scenario: Feature card interactions
    When I hover over the "Easy to Use" feature card
    Then I should see a feature card with title "Easy to Use"
    When I click on the "Easy to Use" feature card
    Then I should be on the features page

  Scenario: Stats section interactions
    When I hover over the "Users" stat item
    Then I should see a stat item with label "Users"

  Scenario: CTA button functionality
    When I click the CTA button
    Then I should be on the registration page

  Scenario: Page scrolling
    When I scroll to the feature cards section
    Then I should see the feature cards section
    When I scroll to the stats section
    Then I should see the stats section
    When I scroll to the newsletter signup
    Then I should see the newsletter signup section

  Scenario: Newsletter signup validation
    When I enter my email "invalid-email" in the newsletter signup
    And I click the subscribe button
    Then I should see an error message

  Scenario: Newsletter signup with empty email
    When I click the subscribe button
    Then I should see an error message
