// Javascript file for the HomePage

// Variables for the user input form.
var userFormEl  = document.querySelector( "#user-form" );
var nameInputEl = document.querySelector( "#username" );


////////////////////////////////////////////////////////////////////////////////////////
var getUserRepos = function ( user ) {

    // Format the GitHub API URL.
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // Make the request.
    var response = fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        })

    });
    console.log("outside");
}


////////////////////////////////////////////////////////////////////////////////////////
// Define the event handlers needed.

// The event handler for the form submit button
var formSubmitHandler = function( event ) {
    event.preventDefault();

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


////////////////////////////////////////////////////////////////////////////////////////
// Define the event listeners needed.

userFormEl.addEventListener( "submit", formSubmitHandler );