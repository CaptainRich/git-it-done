// Javascript file for the HomePage

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

getUserRepos("CaptainRich");