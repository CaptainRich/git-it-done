// Javascript file for the HomePage

// Variables for the user input form, based on 'id' values.
var userFormEl  = document.querySelector( "#user-form" );
var nameInputEl = document.querySelector( "#username" );

// Variables for the display container area of the page.
var repoContainerEl = document.querySelector( "#repos-container" );
var repoSearchTerm  = document.querySelector( "#repo-search-term" );
var wrapperSize     = document.getElementById( "wrapperSize");

// Variables for the 'language buttons'
var languageButtonsEl = document.querySelector( "#language-buttons" );


////////////////////////////////////////////////////////////////////////////////////////
var getUserRepos = function ( user ) {

    // Format the GitHub API URL.  The 'per_page' item overrides the default of 30.
    var apiUrl = "https://api.github.com/users/" + user + "/repos?per_page=100";

    // Make the request.
    var response = fetch(apiUrl)
    .then(function (response) {
        if( response.ok ) {
            response.json().then(function (data) {
                displayRepos( data, user );
            });
        }
        else {
            // The server received the request, but there was some issue (error).
            alert( "Error: " + response.status + " - " + response.statusText );
        }

    })
	.catch( function( error) {
		// Notice this '.catch()' is chained onto the end of the '.then()'
		alert( "Unable to connect to GitHub.");
	});    
}


////////////////////////////////////////////////////////////////////////////////////////
// Define the function to the 'repo' information
var displayRepos = function( repos, searchTerm ) {
    // 'searchTerm' is the Username we searched for

    // Check if the API returned any 'repos' for this user
    if( repos.length === 0 ) {
        repoContainerEl.textContent = "No repositories found for this user." ;
        return;
    }

    // Clear out any earlier displayed data
    repoContainerEl.textContent = "";

    // wrapperSize.classList.remove("wrapper");

    // Put up a title for the list of repos found
    repoSearchTerm.textContent  = searchTerm + " ( " + repos.length + " repos found )";      

    // Display the repository data on the page.
    // Loop over the discovered 'repos'.
    for( i = 0; i < repos.length; i++ ) {
        // Format the 'repo' name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // Create the container for this 'repo'.  Note this is an HTML "anchor"
        var repoEl = document.createElement( "a" );
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        // Link to the next HTML page and send it the selected 'repo' name.
        repoEl.setAttribute( "href", "./single-repo.html?repo=" + repoName );   

        // Create a span element to hold the 'repo' name
        var titleEl = document.createElement( "span" );
        titleEl.textContent = repoName;

        // Append the element to the container
        repoEl.appendChild( titleEl );

        // Now create the status element for 'repo issues'
        var statusEl = document.createElement( "span" );
        statusEl.classList = "flex-row align-center";

        // See if the repo has any issues
        if( repos[i].open_issues_count > 0 ) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // Append the status to the container
        repoEl.appendChild( statusEl );


        // Append the container to the DOM
        repoContainerEl.appendChild( repoEl );
    }

    // Update the page by removing and replacing the footer, after a delay.
    setTimeout( moveFooter, 5000 );


    console.log( repos );
    console.log( searchTerm );
}

///////////////////////////////////////////////////////////////////////////////////////
// Function to remove the "wrapper" class, then re-add it.  This is so when the viewport size
// changes, the footer remains at the bottom.  This function is called by "setInterval",
// after a 2 second delay - to give the GitHub server time to transmit the 
// requested information.

var moveFooter = function () {

    // Remove the wrapper class, which removes the footer.
    wrapperSize.classList.remove("wrapper");

    // Put the wrapper class back on the page
    //wrapperSize.classList.add( "wrapper" );
}


////////////////////////////////////////////////////////////////////////////////////////
// Function to search GitHub for repos based on language features.
var getFeaturedRepos = function( language ) {
    console.log( language );
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + 
                   "+is:featured&sort=help-wanted-issues&per_page=100";

    fetch( apiUrl ).then( function( response ) {
        if( response.ok ) {
            response.json().then(function(data) {
                displayRepos( data.items, language );
            })
        }
        else {
            alert( "Error: " + response.statusText );
        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// Define the event handlers needed.


///////////////////////////////////////////////////////////////////////////////////////
// The event handler for the form submit button
var formSubmitHandler = function( event ) {
    event.preventDefault();       // don't perform default action for the event

    // Get the requested user name from the form
    var username = nameInputEl.value.trim();

    if( username ) {
        getUserRepos( username );
        nameInputEl.value = "";
    }
    else {
        alert( "Please enter a GitHub username." );
    }
    console.log( event );
}


///////////////////////////////////////////////////////////////////////////////////////
// The event handler for the language buttons
var buttonClickHandler = function( event ) {

    // Determine which button was clicked from the button data attributes
    var language = event.target.getAttribute( "data-language" );
    
    // Invoke the API to return the requested language 'repos'
    if( language )
        getFeaturedRepos( language );

    // Clear out any earlier data.  The container is actually cleared before any new
    // data is displayed because 'getFeaturedRepos' runs asynchronously and will take
    // longer to finish.
    repoContainerEl.textContent = "";
}


////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// Define the event listeners needed.

// Event listener for the GitHub user name.
userFormEl.addEventListener( "submit", formSubmitHandler );

// Event listener for the language selection buttons.
languageButtonsEl.addEventListener( "click", buttonClickHandler );
