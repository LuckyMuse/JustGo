function searchPlaces(location) {
	const apiKey = 'AIzaSyBr9VlHBzeBs82Rmm47I0do-GxIvJMdhMk';
	const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=attractions+in+${location}&key=${apiKey}`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			if (data.status === 'OK' && data.results.length > 0) {
				const randomButton = document.getElementById('random-button');
				randomButton.disabled = false;
				randomButton.addEventListener('click', () => {
					const randomIndex = Math.floor(Math.random() * data.results.length);
					displayPlace(data.results[randomIndex]);
				});
			} else {
				displayNoResults();
			}
		})
		.catch(error => {
			console.log(error);
		});
}

function displayNoResults() {
	const results = document.getElementById('results');
	results.innerHTML = '<p>No places found in the specified city.</p>';
}

function displayPlace(place) {
	const name = document.getElementById('place-name');
	const address = document.getElementById('place-address');
	const phone = document.getElementById('place-phone');

	name.textContent = place.name;
	address.textContent = place.formatted_address;
	phone.textContent = place.formatted_phone_number || 'Phone number not available';
}

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const location = document.getElementById('location').value;
	searchPlaces(location);
});

const randomButton = document.getElementById('random-button');
randomButton.disabled = true;
