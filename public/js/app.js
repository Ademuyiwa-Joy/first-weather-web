const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => { //e for event; callback function that runs anytime the event occurs. submit is the name of the event we are listening for.
	e.preventDefault();
	const location = search.value;

	messageOne.textContent = 'loading...';
	messageTwo.textContent = '';
	
	fetch('/weather?address='+location).then((response) => {
	response.json() //parsing the response data to an object
	.then((data) => {
		if(data.error){
			messageOne.textContent = data.error
		}
		else{
			messageOne.textContent = data.location;
			messageTwo.textContent = data.forecast;
		}
	})
	})	
})