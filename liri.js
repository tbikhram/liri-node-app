// Grabbing data from Keys.js

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'ynFFRb4iHjPzNxlsloc9fPvPQ',
  consumer_secret: 'brlUGILbzq7EIm9JLQhTZps3tPOjvMLdeXlYHykeUF7tRKr0yT',
  access_token_key: '778845980493885440-CYaaH45rkJp6kjfsunkjcv2joJddBFs',
  access_token_secret: 'M3ntE2Z9vZLfuzFg9hN6BfujjXBhYME4FLM169LLf3IZI'
});
 
var params = {screen_name: 'Tbikhram', count:20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (error) {
  	console.log(error)
  
    
}else{

	tweets.forEach(function(tweet){
	  			var tweetOutput = "Tweet: " + tweet.text + "\n" +
	  				"Published: " + tweet.created_at + "\n";
	  			console.log(tweetOutput);



})

	
}

});
 