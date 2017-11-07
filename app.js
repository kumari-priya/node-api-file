const methods = require('./methods.js');
let nodeArg = process.argv;
let apiName = nodeArg[2];
let apiQuery = "";

for (let i = 3; i < nodeArg.length; i++) {
  apiQuery += nodeArg[i] + " ";
}

let getApiData = (apiName, apiQuery) => {
  switch (apiName) {

    case "do-what-it-says":
      let {
        Name,
        Query
      } = methods.readFromFile();
      getApiData(Name, Query);
      break;

    case "my-tweets":
      if (apiQuery.length === 0) apiQuery = 'melindagates';
      methods.twitterApi(apiQuery);
      break;

    case "spotify-this-song":
      if (apiQuery.length === 0) apiQuery = 'The Sign';
      methods.spotifyApi(apiQuery);
      break;

    case "movie-this":
      if (apiQuery.length === 0) apiQuery = 'Mr. Nobody';
      methods.omdbApi(apiQuery);
      break;

  }
}

getApiData(apiName, apiQuery);
