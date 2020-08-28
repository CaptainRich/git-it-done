// Javascript file for the HomePage

var getUserRepos = function() {
    fetch( "https://api.github.com/users/octocat/repos");
}

getUserRepos();