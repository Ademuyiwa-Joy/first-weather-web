const express = require('express');
const path = require('path');

const hostname = 'localhost';
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const app = express();
const port = process.env.PORT || 3000;

//defining path for express config
const publicDirectoryPath = path.join(__dirname, '../public'); 
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handle bars engine and views location
app.set('view engine', 'hbs') //hbs- handle bars, can be used to create dynamic templates, and render them: app.set(name, value)
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); //partials can be used to render the same content over again in various parts

//setting up static directory to serve
app.use(express.static(publicDirectoryPath)); //for serving up static resources from the formed path


app.get('', (req, res) => {
	res.render('index',{
		title: 'Weather Home Page',
		name: 'Ademuyiwa Joy'
	})
}); 

app.get('/about', (req, res) => {
	res.render('about',{
		title: "About Me",
		name: 'Jamel'
	})
})

app.get('/help', (req, res) => {
	res.render('help',{
		help: "You need help?",
		title: 'Help',
		name: 'Joy'
	})
})

//query strings; URL begins with a '?', after the base URL. '&' is used to further it 
app.get('/weather', (req, res) => {
	if(!req.query.address){
		return res.send({
			error: "You need to provide an address"
		});
	}
	geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { //using an empty object default value, incase address is invalid, causing latitude etc to be undefined
		if(error) {
			return res.send({error})
		}
	
		forecast(latitude, longitude, (error, forecastData) => {
			if(error) {
				return res.send({error: error})
			}
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			})
	});	
});
});

app.get('/products', (req, res) => {
	if(!req.query.search){
		return res.send({
			error: 'You need to search'
		});
	}
	console.log(req.query.search);
	res.send({product: []})
})


app.get('/help/*', (req, res) => {
	res.render('404',{
		title: 'Article',
		name: 'Ademuyiwa Joy',
		errorMessage: 'Help article not found'
	}) 
});

app.get('*', (req, res) => { //*: special character representing all routes that have NOT been matched. It comes last
	res.render('404',{ // setting up a handler for error 404 page in express
		title: 'Ooops!',
		name: 'Ademuyiwa Joy',
		errorMessage: 'Page not found'
	}) 
});



app.listen(port,hostname, () => {
	console.log(`Server running on ${hostname}:${port}`)
})