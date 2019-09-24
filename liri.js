// Require NPM list
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

// Spotify ===================================================

var spotify = new Spotify ({
    id: keys.spotifyKeys.id,
    secret: keys.spotifyKeys.secret
});

var getArtistNames = function(artist) {
    return artist.name;
}

var getMeSpotify = function(songName) {
spotify.search( {type: 'track', query: songName},
    function(err, data) {
        if ( err ) {
            return console.log('Error occurred: ' + err);
        }
        console.log("ARTIST NAME");
        console.log(data.tracks.items[0].artists[0].name);

        var songs = data.tracks.items;
        for (var i=0 ; i < songs.length ; i++ ) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('-----------------------------------');
        }
    });
}

// OMDB ====================================================

var getMeMovie = function(movieName) {

    request('http://www.omdbapi.com/?apikey=' + keys.omdbKeys.id + '&t=' + movieName + '&y=&plot=short&r=json',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {

                var jasonData = JSON.parse(body);
                console.log('Title: ' + jasonData.Title);
                console.log('Year: ' + jasonData.Year);
                console.log('Rated: ' + jasonData.Rated);
                console.log('IMDB Rating: ' + jasonData.imdbRating);
                console.log('Country: ' + jasonData.Country);
                console.log('Production: ' + jasonData.Production);
                console.log('Language: ' + jasonData.Language);
                console.log('Plot: ' + jasonData.Plot);
                console.log('Actors: ' + jasonData.Actors);
                console.log('Rotten tomatoes rating: ' + jasonData.Ratings[1]["Value"]);
                console.log('Awards: ' + jasonData.Awards);
            }
    });
}

var doWhatItSays = function() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;
        var dataArr = data.split(',');
        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1){
            pick(dataArr[0]);
        }
    });
}

var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'spotify-this-song' :
            console.log("CASE - SPOTIFY");
            getMeSpotify(functionData);
            break;
        case 'movie-this' : 
            console.log("CASE - OMDB")
            getMeMovie(functionData);
            break;
        case 'do-what-it-says' :
            console.log("CASE - JUST DO IT")
            doWhatItSays();
            break;
        default:
            console.log('LIRI does not know that');
    }   
}

var runThis = function(argOne, argTwo) {
pick(argOne,argTwo);
}

runThis(process.argv[2], process.argv[3]);





// request('http://www.google.com', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body) // show the HTML for the Google homepage.
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
//     }
// });

//combine all argvs after [2] into a single element
// console.log(process.argv);
// var mySongArr = [];
// for (i=3;i<process.argv.length;i++) {
// mySongArr.push(process.argv[i]);
// }
// var mySong = mySongArr.join(" ");
// console.log(mySong);

