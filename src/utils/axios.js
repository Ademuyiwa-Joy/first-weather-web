const axios = require('axios'); //axios npm used for making hhtp requests to fetch or save data
const address = process.argv[2];

if(!address){
	console.log('Input a valid location');
}
else{ 
	const params = {
		access_key: '89a6506b2dc30ad4ff151e4a199c3936',
		query: address,
		units: 's'
	};

	const url = 'http://api.weatherstack.com/current';
	axios.get(url, {params})
	.then((response) => {
		const APIresponse = response.data;
		console.log("The current temperature is at "+APIresponse.current.temperature+" degrees out");
	})
	.catch((err) => console.log('Could not connect to location'))

}


