//function for converting an address to latitude and longitude
const request = require('postman-request');
const geocode = (address, callback)=> {
	const geocodeURL = 'https://api.openweathermap.org/geo/1.0/direct?q='+address+'&limit=1&appid=be0417bbc54ca5d7163bf20a08b9107c';
	request({url:geocodeURL, json:true}, (error, response) => {
		if(error){
			callback('Unable to access weather services!', undefined)
		}
		else if(response.body.length === 0){
			callback('Unable to find location, try another search', undefined)
		}
		else{
			callback(undefined, {
				longitude: response.body[0].lon,
				latitude: response.body[0].lat,
				location: response.body[0].state
			})
		}
	})

	
}

module.exports = geocode;