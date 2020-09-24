/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
loadKittens();
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
	event.preventDefault();
	let form = event.target;

	let kitten = {
		id        : generateId(),
		name      : form.name.value,
		mood      : 'Tolerant',
		affection : 5
	};
	kittens.push(kitten);
	saveKittens();
	form.reset();
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
	window.localStorage.setItem('kittens', JSON.stringify(kittens));

	drawKittens();
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
	let storedKittens = JSON.parse(window.localStorage.getItem('kittens'));

	if (storedKittens) {
		kittens = storedKittens;
	}
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
	let kittenListElement = document.getElementById('kittens');
	let kittensTemplate = '';
	kittens.forEach((kitten) => {
		kittensTemplate += `
			<div id="${kitten.id}" class="${kitten.mood} d-column card shadow kitten">
				<div id="kittenName">${kitten.name}</div>
				<div>
					<img src="https://robohash.org/+${kitten.name}+?set=set4" alt="kitten image" id="kittenPic">
				</div >
				<div id="kittenMood">${kitten.mood}</div>
				<div id="kittenAffection">${kitten.affection}</div>
				<div class="d-row">
					<button onclick="pet('${kitten.id}')">Pats</button>
					<button onclick="catnip('${kitten.id}')">Gravy</button>
				</div>
				<div>
					<span class="text-danger">
						<i class="fa fa-times" aria-hidden="true" onclick="removeKitten('${kitten.id}')"></i>
					</span>
				</div>
          </div >
  		`;
	});
	kittenListElement.innerHTML = kittensTemplate;
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
	return kittens.find((k) => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
	let kitten = findKittenById(id);
	let rNumber = Math.random();
	if (kitten == -1) {
		throw new Error('Invalid Kitten Id');
	}
	if (rNumber > 0.7) {
		kitten.affection++;
	} else {
		kitten.affection--;
	}
	setKittenMood(kitten);
	saveKittens();
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
	let kitten = findKittenById(id);
	if (kitten == -1) {
		throw new Error('Invalid Kitten Id');
	}
	kitten.mood = 'Tolerant';
	kitten.affection = 5;
	setKittenMood(kitten);
	saveKittens();
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
	//check value of affection
	if (kitten.affection >= 6) {
		//change value of mood based on affection
		kitten.mood = 'Happy';
		//document.getElementById(`${kitten.id}`).classList.add('happy');
	} else if (kitten.affection <= 5 && kitten.affection > 3) {
		//change value of mood based on affection
		kitten.mood = 'Tolerant';
		//document.getElementById(`${kitten.id}`).classList.add('tolerant');
	} else if (kitten.affection > 0 && kitten.affection <= 3) {
		//change value of mood based on affection
		kitten.mood = 'Angry';
		//document.getElementById(`${kitten.id}`).classList.add('angry');
	} else if (kitten.affection <= 0) {
		//change value of mood based on affection
		kitten.mood = 'Gone';
		//document.getElementsByClassName(`${kitten.id}`).classList.add('gone');
	}
}

function getStarted() {
	document.getElementById('welcome').classList.add('hidden');
	document.getElementById('kittens').classList.remove('hidden');
	saveKittens();
}

function removeKitten(kittenId) {
	let index = kittens.findIndex((kitten) => kitten.id == kittenId);
	if (index == -1) {
		throw new Error('Invalid Kitten Id');
	}
	kittens.splice(index, 1);
	saveKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
	return Math.floor(Math.random() * 10000000) + '-' + Math.floor(Math.random() * 10000000);
}

loadKittens();
drawKittens();
