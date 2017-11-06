var nodeArg = process.argv;
var apiName = nodeArg[2];
var apiQuery="";
for (var i = 3; i < nodeArg.length; i++) {
apiQuery+=nodeArg[i]+ " ";
}
apiQuery = apiQuery.trim();


switch (apiName) {
  case "my-tweets":
    twitterApi();
    break;

  case "spotify-this-song":
    spotifyApi();
    break;

  case "movie-this":
    omdbapi();
    break;

  case "do-what-it-says":
    read();
    break;
}
