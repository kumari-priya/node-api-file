const keys = require('./keys.js');
const fs = require("fs");
let logMessage;

// omdb api function
exports.omdbApi = (apiQuery) => {
  let request = require("request");
  let apiKey = keys.omdbKeys.omdbKey;
  let title = apiQuery
  let queryUrl = `http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`;
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      let objectBody = JSON.parse(body);
      let message = `Title of the movie - ${objectBody.Title} \nYear the movie came out - ${objectBody.Year} \nIMDB Rating of the movie - ${objectBody.imdbRating} \nRotten Tomatoes Rating of the movie - ${objectBody.Ratings[1].Value} \nCountry where the movie was produced - ${objectBody.Country} \nPlot of the movie - ${objectBody.Plot} \nActors in the movie - ${objectBody.Actors}\n`;
      console.log(message);
      writefile(message);
    }
  });
};

// twitter api function
exports.twitterApi = (apiQuery) => {
  let Twitter = require('twitter');
  let client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });
  let screen_name = apiQuery;
  let params = {
    screen_name: apiQuery,
    count: 20
  };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (let i = 0; i < tweets.length; i++) {
        let message = `Created At - ${tweets[i].created_at} \n${tweets[i].text}\n`;
        console.log(message);
        logMessage += message;
        // writefile(message);
      }
      writefile(logMessage);
    }
  });
};

// spotify api function
exports.spotifyApi = (apiQuery) => {
  let Spotify = require('node-spotify-api');
  let spotify = new Spotify({
    id: keys.spotifykeys.id,
    secret: keys.spotifykeys.secret
  });
  let track = apiQuery;

  spotify.search({
    type: 'track',
    query: track,
    limit: 10
  }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    let objTrack = data.tracks.items;
    for (let i = 0; i < objTrack.length; i++) {
      let artists = objTrack[i].artists[0].name;
      for (let j = 1; j < objTrack[i].artists.length; j++) {
        artists += ", " + objTrack[i].artists[j].name;
      }
      let message = `Artist(s) - ${artists} \nSong's name - ${objTrack[i].name} \nPreview link - ${objTrack[i].album.external_urls.spotify} \nAlbum Name - ${objTrack[i].album.name}\n`;
      console.log(message);
      logMessage += message;
      // writefile(message);
    }
    writefile(logMessage);
  });
};

//read file random.txt for do-what-it-says
exports.readFromFile = () => {
  let contents = fs.readFileSync('./assets/random.txt').toString();
  let dataArr = contents.split(",");
  let Name = dataArr[0].trim();
  let Query = dataArr[1].trim();
  return {
    Name,
    Query
  };
};

// write log to log.txt
let writefile = (data) => {
  // appending seperator at the end for easy reading of log file
  data += '---------------------------------------------------------------------------------\n';
  let textFile = './assets/log.txt';
  fs.appendFile(textFile, data, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Log added to log.txt!");
    }
  });
}
