// JavaScript file for "issue list" page

// Create a reference to the container for 'Issues'
var issueContainerEl = document.querySelector( "#issues-container" );

// Create a reference to the container for 'Warnings'
var limitWarningEl = document.querySelector( "#limit-warning" );

// Create a reference to the 'repo name' for display
var repoNameEl = document.querySelector( "#repo-name" );


////////////////////////////////////////////////////////////////////////////////
// Function to extract the 'repo' name from the query string
var getRepoName = function() {

    var queryString = document.location.search;   // get the query string
    var repoName = queryString.split("=")[1];     // split at the '=', get the 2nd half

    // Only try to show the 'repo issues' if we have a 'repo name'
    if (repoName) {
        getRepoIssues(repoName);                  // show the issues
        repoNameEl.textContent = repoName;        // put the 'repo' name at the top of the page
    }
    else {
        document.location.replace( "./index.html" );   // otherwise go back to the main page
    }
}

////////////////////////////////////////////////////////////////////////////////
// Function to take a repository name and assemble its"issues".
var getRepoIssues = function( repo ) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc?per_page=100";

    fetch( apiUrl ).then( function( response ) {
        // Request was successful
        if( response.ok )   {
            response.json().then( function( data ) {
                displayIssues( data );

                //If there are more than 30 issues (the 'Link' exists), warn the user.  
                if( response.headers.get( "Link" ) ) {
                    displayWarning( repo );
                }
            });
        }
        else {
            // If the request was not successful, return to the home page.
            alert( "Error: " + response.status + " - " + response.statusText );
            document.location.replace( "./index.html" );   
        }
    });
};


////////////////////////////////////////////////////////////////////////////////
// Function to display the repo issues
var displayIssues = function( issues ) {

    // If there are no open 'issues' in this 'repo', inform the user
    if( issues.length === 0 ) {
        issueContainerEl.textContent = "This repository has no open issues.";
        return;
    }

    // Loop over all of the 'issues' found in the 'repo'
    for ( var i = 0; i < issues.length; i++) {
        // Create a link element to take users to the issue on GitHub
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");          // opens in a new tab

        // Create a 'span' to hold the issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //Append the 'title' to the 'Issue' container
        issueEl.appendChild(titleEl);


        // Create a 'type' element for the issue
        var typeEl = document.createElement("span");

        // Determine if the issue is an 'issue' or a 'pull request'
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        }
        else {
            typeEl.textContent = "(Issue)";
        }

        // Append the 'type' to the 'Issue' container
        issueEl.appendChild(typeEl);

        // Put the current 'issue' on the HTML page.
        issueContainerEl.appendChild(issueEl);
    }
}


////////////////////////////////////////////////////////////////////////////
// Function to warn users the 'repo' has more than 30 issues
var displayWarning = function( repo ) {

    // Add informative test
    limitWarningEl.textContent = "To see more than 30 issues, visit: ";

    // Create the link reference
    var linkEl = document.createElement( "a" );
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute( "href", "https://github.com/" + repo + "/issues" );
    linkEl.setAttribute( "target", "_blank" );         // load on a new page for GitHub display.

    // Append the warning to the HTML container
    limitWarningEl.appendChild( linkEl );
}

getRepoName();