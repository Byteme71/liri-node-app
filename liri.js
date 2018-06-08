require("dotenv").config();

var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var keys = require("./keys.js");

var input = process.argv[2];

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// console.log(spotify);

// var queryUrlTwitter = "https://api.twitter.com/1.1/statuses/user_timeline.json";

var request = require('request');


// console.log(request.get);

var params = {
    count: 1
}

// var myTweets = client.get('statuses/user_timeline', params, searchedData);
// function searchedData(err, data, response){

//     for(i = 0; i < params.count; i++){
//         console.log("My tweet is: " + data[i].text + " and it was created on: " + data[i].created_at);
//     }  
// }

// if (input === "my-tweets"){
//     myTweets;
// }


spotify.search({ type: 'track', query: 'gods plan', limit: 5 }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    console.log(data.tracks.items);
    // console.log(data.tracks.items[0].name);
    // console.log(data.tracks.items[0].artists[1].name);
    // console.log(data.tracks.items[0].preview_url);
});