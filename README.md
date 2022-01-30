# Git-It-Done

A utility to scan Git for repositories, that belong to a specified username.  Then
* Repos with no open issues will be displayed with a checkmark.
* Repos with open issues will display an X with the number of issues or pull requests.
* Clicking on a repository name will display a new page listing all open issues.
* A language button is available to display a list of repos that use that language.  The list of featured repos will look identical to the list of user repos.


This application relies on a GitHub server-side API to return the requested information.  See (https://docs.github.com/en/rest/reference) for information on GitHub APIs.