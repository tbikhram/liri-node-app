// Grabbing data from Keys.js
var keys= require('./keys');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require ('fs');



//tweets 20 of users most recent tweets
 
var client = new Twitter({
  consumer_key: 'ynFFRb4iHjPzNxlsloc9fPvPQ',
  consumer_secret: 'brlUGILbzq7EIm9JLQhTZps3tPOjvMLdeXlYHykeUF7tRKr0yT',
  access_token_key: '778845980493885440-CYaaH45rkJp6kjfsunkjcv2joJddBFs',
  access_token_secret: 'M3ntE2Z9vZLfuzFg9hN6BfujjXBhYME4FLM169LLf3IZI'
});


fucntion theTweets(){
var params = {screen_name: 'Tbikhram', count:20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (error) {
  	console.log(error)
  
    
}else{

	tweets.forEach(function(tweet){
	  			var tweetOutput = "Tweet: " + tweet.text + "\n" +
	  				"Published: " + tweet.created_at + "\n";
	  			//console.log(tweetOutput);
	  			logText(tweetOutput)



})

	
}

});
}


//spotify 



var spotify = require('spotify');
var request = require('request');
var fs = require('fs'); 

 
function chosenSpotify(userSpotInput){
	spotify.search({type: 'track',query: userSpotInput}, function(err, userSpotInput,response) {
	    if (err) {
	        console.log('Error occurred: ' + err);
	        
	    }else{
	    	var userSI = userSpotInput.tracks.items[0];
	  		var spotifyOutput = "Artist: " + userSI.artists[0].name + "\n" +
	  			"Song Name: " + userSI.name + "\n" +
	  			"Spot Link: " + userSI.external_urls.spotify + "\n" +
	  			"Album: " + userSI.album.name + "\n";
	  		// console.log(spotifyOutput);
	  		logText(spotifyOutput);			
	    }
	  
	    
	});
}


 





// pastes the movie data to the user and calls the
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  }

  else {

    movieName += nodeArgs[i];

  }
}

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log(
    				"Movie Title: " + JSON.parse(body).Title,
					"Release Year: " + JSON.parse(body).Year,
					"IMBD Rating: " + JSON.parse(body).imdbRating,
					"Country Produced: " + JSON.parse(body).Country,
					"Plot: " + JSON.parse(body).Plot,
					"Actors: " + JSON.parse(body).Actors,
					"Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating,
					"Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL;







    	);
  }
});


// Start function which provides the user a series of choices.
function start(){
	inquirer.prompt([
		{
			type: "list",
			name: "whatToPick",
			message: "Which one would you like to check out?",
			choices: ["My Twitter", "Spotify", "Movies", "Random", "Exit"] 
		}
	]).then(function(user) {
		if (user.whatToPick == "My Twitter"){
			myTweets();
		}else if (user.whatToPick == "Spotify"){
			inquirer.prompt([
				{
					type: "input",
					name: "songChoice",
					message: "What song would you like to check out?",
				}
			]).then(function(userSpotInput){
				if (userSpotInput.songChoice == ""){
					chosenSpotify("Ace of Base")
				}else{
					chosenSpotify(userSpotInput.songChoice);	
				}
			})
		}else if (user.whatToPick == "Movies"){
			inquirer.prompt([
				{
					type: "input",
					name: "movieChoice",
					message: "What movie would you like to check out?",
				}
			]).then(function(userMovieInput){
				if (userMovieInput.movieChoice == ""){
					chosenMovie("Mr. Nobody")
				}else{
					chosenMovie(userMovieInput.movieChoice);
				}

			})		
		}else if (user.whatToPick == "Random"){
			randomChoice();		
		}else if (user.whatToPick == "Exit"){
			inquirer.prompt([
				{
					type: "confirm",
					name: "exitApp",
					message: "Are you sure you want to leave?",
				}
			]).then(function(leave){
				if (leave.exitApp == true){
					console.log("Bye!");
				}else{
					start();
				}

			})	
		}
	})
}

start();

// random.txt file 
function randomChoice(){
	fs.readFile("random.txt", 'utf8', function(error, data) {		    
		
	        return console.log(error);
	    }else{
	    	var dataArr = data.split(",");
	    	var userFirstInput = dataArr[0];
	    	var userSecondInput = dataArr[1];

	    	switch(userFirstInput){
	    		case "spotify-this-song":
	    			chosenSpotify(userSecondInput);
	    			break;
	    	}
	    }
	}); 		
}








