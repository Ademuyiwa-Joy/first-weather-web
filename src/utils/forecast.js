const request = require('postman-request');

const forecast = (longitude,latitude, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=89a6506b2dc30ad4ff151e4a199c3936&query='+ longitude +","+ latitude +'&units=m';
	
	request({url, json: true}, (error, {body}) => { //request takes 2 arguements, options object and a callback function
		if(error) {
			callback('Unable to access weather services!', undefined)
		}
		else if(body.error){
			callback('Unable to find location, try another search', undefined)
		}
		else{
			var data = body.current;
			callback(undefined,data.weather_descriptions[0] +'. It is currently '+data.temperature+" degrees Celsius, feels like: "+data.feelslike+" degrees out. There is "+data.precip+"% chance of rain.")
		}
	})
}

module.exports = forecast;