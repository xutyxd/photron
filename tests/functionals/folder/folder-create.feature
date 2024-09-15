# folder-create.feature
Feature: Folder create

  Scenario: App is alive
    Given I perform a post to "folders" with name "name" and description "test"
    When response is replied from the server with folder
    Then it should return a "200" code and the folder created with name "name" and description "test"