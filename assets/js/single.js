// JavaScript file for "issue list" page

// Create a reference to the container for 'Issues'
var issueContainerEl = document.querySelector( "#issues-container" );

// Create a reference to the container for 'Warnings'
var limitWarningEl = document.querySelector( "#limit-warning" );

////////////////////////////////////////////////////////////////////////////////
// Function to take a repository name and assemble its"issues".
var getRepoIssues = function( repo ) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch( apiUrl ).then( function( response ) {
        // Request was successful
        if( response.ok )   {
            response.json().then( function( data ) {
                displayIssues( data );

                // Warn the user if there are more than 30 issues.
                if( response.headers.get( "Link" ) ) {
                    displayWarning( repo );
                }
            });
        }
        else {
            alert( "There was a problem with your request." );
        }
    });
};


////////////////////////////////////////////////////////////////////////////////
// Function to display the repo issues
var displayIssues = function( issues ) {

    // If there are no open 'issues' in this 'repo', warn the user
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
    linkEl.setAttribute( "target", "_blank" );         // load on a new page

    // Append the warning to the HTML container
    limitWarningEl.appendChild( linkEl );
}

getRepoIssues( "facebook/react" );