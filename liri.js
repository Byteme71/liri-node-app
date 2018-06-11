require("dotenv").config();

var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var keys = require("./keys.js");

var input = process.argv[2];

var secondInput = ""
for(var i = 3; i < process.argv.length; i++) {
    secondInput += process.argv[i] + "+"
}
secondInput = secondInput.slice(0, -1)

// console.log(secondInput);

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var request = require('request');

var fs = require("fs");

var inquirer = require("inquirer");

// var queryUrlTwitter = "https://api.twitter.com/1.1/statuses/user_timeline.json";


var params = {
    count: 5
}

function myTweets() {
    client.get('statuses/user_timeline', params, searchedData);
function searchedData(err, data, response){
    if (err) {
        console.log('Error occurred: ' + err && response);
    }

    for(i = 0; i < params.count; i++){
        console.log("\nMy tweet is: " + data[i].text + " and it was created on: " + data[i].created_at);
    }  
}
};

// If no song is provided then your program will default to "The Sign" by Ace of Base.
// Split the text by the comma
// var dataArr = data.split(",");

// Store the first half in a variable
// command = dataArr[0];

function spotifyFind() {
    spotify.search({ type: 'track', query: secondInput, limit: 1 }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    // console.log(console.log(JSON.stringify(data.tracks, null, 2)));
    console.log("\nThe artist is: " + data.tracks.items[0].artists[0].name);
    console.log("\nThe track name is: " + data.tracks.items[0].name);
    console.log("\nThe album name is: " + data.tracks.items[0].album.name);
    console.log("\nPreview the song at: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
    console.log("\nOr log into Spotify to hear the song at: " + JSON.stringify(data.tracks.items[0].external_urls, null, 2));
});
}



function getMovie(){
var queryUrl = "http://www.omdbapi.com/?t=" + secondInput + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {

        // console.log(body);

        console.log("\nThe name of the movie is: " + JSON.parse(body).Title);
        console.log("\nThe Release Year of the movie is: " + JSON.parse(body).Year);
        // var rottenTom = JSON.parse(body).Ratings[1];
        console.log("\nThe Rotten Tomatoes rating of the movie is: " + JSON.parse(body).Ratings[1].Value)
        console.log("\nThe IMDB rating of the movie is: " + JSON.parse(body).imdbRating);
        // console.log("\nThe Rotten Tomatoes rating of the movie is: " + JSON.stringify(rottenTom).slice(37,40));
        console.log("\nThe Country where the movie was produced is: " + JSON.parse(body).Country);
        console.log("\nThe language of the movie is: " + JSON.parse(body).Language);
        console.log("\nThe plot of the movie is: " + JSON.parse(body).Plot);
        console.log("\nThe Actors in the movie are: " + JSON.parse(body).Actors); 
    }
});
}





function readRandom(){
fs.readFile("random.txt", "utf8", function (error, data) {

    if (error) {
        return console.log(error);
    }
    else{
        var dataArr = data.split(",");
        secondInput = dataArr[0];
        console.log(dataArr[0] + " " + dataArr[1].slice(1,19));
    }

   

});
}


function captureInput(input){
    if(input === "spotify-this-song"){
        spotifyFind();
    }
    else if (input === "spotify-this-song" && secondInput.length === 0) {

        spotify.search({ type: 'track', query: "the sign", limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // console.log(console.log(JSON.stringify(data.tracks, null, 2)));
            console.log("\nThe artist is: " + data.tracks.items[0].artists[0].name);
            console.log("\nThe track name is: " + data.tracks.items[0].name);
            console.log("\nThe album name is: " + data.tracks.items[0].album.name);
            console.log("\nPreview the song at: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
            console.log("\nOr log into Spotify to hear the song at: " + JSON.stringify(data.tracks.items[0].external_urls, null, 2));

        });
    }
    else if (input === "my-tweets") {
        myTweets();
    }
    else if (input === "movie-this"){
        getMovie();
    }
    else if(input === "do-what-it-says"){
        readRandom();
        spotifyFind();
    }

};

captureInput(input);






// function start() {

//   inquirer.prompt([
//     {
//         type: "list",
//         name: "questionOne",
//         message: "Hi this is Liri, What would you like to do?",
//         choices: ["spotify-this-song", "my-tweets", "movie-this", "do-what-it-says"]
//     }
//   ]).then(function(response) {
//     console.log(response.questionOne)
//     switch (response.questionOne) {

//         case "spotify-this-song":
   
//             spotify.search({ type: 'track', query: secondInput, limit: 1 }, function (err, data) {
//                 if (err) {
//                     return console.log('Error occurred: ' + err);
//                 }
//                 // console.log(console.log(JSON.stringify(data.tracks.items[4].preview_url, null, 2)));
//                 console.log("\nThe artist is: " + data.tracks.items[0].artists[0].name);
//                 console.log("\nThe track name is: " + data.tracks.items[0].name);
//                 console.log("\nThe album name is: " + data.tracks.items[0].album.name);
//                 console.log("\nPreview the song at: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
//                 console.log("\nOr log into Spotify to hear the song at: " + JSON.stringify(data.tracks.items[0].external_urls, null, 2));
//             });

//         break;
//         default: "The Sign";

//         case "my-tweets!":
        
//             client.get('statuses/user_timeline', params, searchedData);
//             function searchedData(err, data, response) {
//                 if (err) {
//                     console.log('Error occurred: ' + err && response);
//                 }

//                 for (i = 0; i < params.count; i++) {
//                     console.log("\nMy tweet is: " + data[i].text + " and it was created on: " + data[i].created_at);
//                 }
//             };

//         // fs.appendFile('clarks_real_friendslist.txt', albert + " are definitely real and Clark's friends.\r\n", function (err) {
//         //   if (err) throw err;
//         //   console.log('Saved!');

//         break;

//         case "movie-this":
    
//             var queryUrl = "http://www.omdbapi.com/?t=" + secondInput + "&y=&plot=short&apikey=trilogy";

//             request(queryUrl, function (error, response, body) {

//                 if (!error && response.statusCode === 200) {

//                     // console.log(body);

//                     console.log(JSON.parse(body).Title);
//                     console.log("\nThe Release Year of the movie is: " + JSON.parse(body).Year);
//                     // var rottenTom = JSON.parse(body).Ratings[1];
//                     console.log("\nThe Rotten Tomatoes rating of the movie is: " + JSON.parse(body).Ratings[1].Value)
//                     console.log("\nThe IMDB rating of the movie is: " + JSON.parse(body).imdbRating);
//                     // console.log("\nThe Rotten Tomatoes rating of the movie is: " + JSON.stringify(rottenTom).slice(37,40));
//                     console.log("\nThe Country where the movie was produced is: " + JSON.parse(body).Country);
//                     console.log("\nThe language of the movie is: " + JSON.parse(body).Language);
//                     console.log("\nThe plot of the movie is: " + JSON.parse(body).Plot);
//                     console.log("\nThe Actors in the movie are: " + JSON.parse(body).Actors);
//                 }
//             });

//         break;

//         case "do-what-it-says":

//             fs.readFile("random.txt", "utf8", function (error, data) {

                // if (error) {
                //     return console.log(error);
                // }
                // else {
                //     var dataArr = data.split(",");
                //     secondInput = dataArr[0];
                //     console.log(dataArr[0] + " " + dataArr[1].slice(1, 19));
                // }

                

// });

//     }

//   })

// }

// start();
