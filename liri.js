require("dotenv").config();
var request = require("request");
var $ = require('jquery');
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var keys = require('./keys.js');
var omdb = require('omdb');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



var userInput = process.argv[3];
var pickModule = process.argv[2];

switch(pickModule) {
  case "spotify-this-song": spotifyPickSong(); break;
  case "movie-this": movieThis(); break;
  case "my-tweets": tweets(); break;
  case "do-what-it-says": doIt(); break;
}

function spotifyPickSong() {
spotify
  .request('https://api.spotify.com/v1/search?q=track:' + userInput + '&type=track')
  .then(function(data) {
    console.log(data.tracks.items[0].artists[0].name); 
    console.log(data.tracks.items[0].preview_url); 
    console.log(data.tracks.items[0].name); 
    console.log(data.tracks.items[0].album.name); 
  }) 
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
};

function movieThis() {
  request("http://www.omdbapi.com/?t="+ userInput + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
      // console.log(body);
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      console.log("The movie's title is: " + JSON.parse(body).Title);
      console.log("The movie was released in : " + JSON.parse(body).Year);
      console.log("The movie's imdb rating is " + JSON.parse(body).Ratings[0].Value);
      console.log("The movie's rotten tomatoes rating is : " + JSON.parse(body).Ratings[1].Value);
      console.log("The movie was produced in : " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Cast: " + JSON.parse(body).Actors);
    }
  });
}; 

function tweets() {
  var params = {screen_name: 'Paul21729738'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < 20; i++){
    console.log(tweets[i].text);
    }
  }
});
}

function doIt() {
  fs.readFile("random.txt", "utf-8", function(err, data) {
      console.log(data);
   });
}

