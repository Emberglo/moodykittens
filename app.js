/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
let newKitten = {};
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
	//keep page from reloading on form submission
	event.preventDefault();
	//capture data from form
	let form = event.target;

	//set name as entered in form and default info for new kitten
	newKitten.name = form.name.value;

	newKitten.id = generateId();

	newKitten.affection = 5;

	newKitten.mood = 'Tolerant';

	console.log(newKitten);
	//add newKitten to kittens array
	kittens.push(newKitten);
	//save kittens to local storage
	saveKittens();
	// reset form
	form.reset();
	console.log(kittens);
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
	window.localStorage.setItem('kittens', JSON.stringify(kittens));
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
	let kittenData = JSON.parse(window.localStorage.getItem('kittens'));

	if (kittenData) {
		kittens = kittenData;
	}

	drawKittens();
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
	let template = '';
	kittens.forEach((kitten) => {
		template += `
            <div class="d-flex space-between d-column card">
              <span class="text-danger" id="delete">
              <i class="fa fa-times" aria-hidden="true" onclick="removeKitten()"></i>
              </span>
              <span>
                <img src="https://robohash.org/+${kitten.name}+?set=set4" alt="">
              </span>
              <span>
                ${kitten.name}
              </span>
              <span>
                ${kitten.mood}
              </span>
              <span class="d-row">
                <span>
                  <button onclick="pet()">Pats</button>
                </span>
                <span>
                  <button onclick="catnip()">Treats</button>
                </span>
              </span>
            </div>
        `;
	});

	document.getElementById('kittens').innerHTML = template;
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
function pet(id) {}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
	//might need to target a different object for this to work
	for (let i = 0; i < kittens.length; i++) {
		if (kittens[i].affection >= 6) {
			kittens[i].mood = 'Happy';
			kittens[i].classList.add('kitten happy');
		} else if (kittens[i].affection <= 5) {
			kittens[i].mood = 'Tolerant';
			kittens[i].classList.add('kitten tolerant');
		} else if (kittens[i].affection <= 3) {
			kittens[i].mood = 'Angry';
			kittens[i].classList.add('kitten angry');
		} else if (kittens[i].affection <= 0) {
			//not sure if this is the right way to do this, & can't check yet
			kittens.splice(kittens.indexOf(kittens[i], 1));
		}
	}
}

function getStarted() {
	document.getElementById('welcome').classList.add('hidden');
	document.getElementById('kittens').classList.remove('hidden');
	drawKittens();
}

function removeKitten() {
	document.getElementById('kittens').onclick = function deleteKitten() {
		kittens.splice(kittens.indexOf(click.target), 1);
	};
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
