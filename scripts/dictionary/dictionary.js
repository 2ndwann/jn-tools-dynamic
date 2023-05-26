// Dictionary (SERVER)


// Switch dictionary
let getDictionaryResults = (language, lookup) => { return new Promise((resolve, reject) => {
	switch (language) {
		case 'Weskethian':
			return false; // (return false for now)
		case 'Vilden':
			return false;
		case 'Proto-Minami':
			require('./dictionaries/minami/minami.js')(lookup).then((results) => { resolve(results); }, (err) => { resolve([]); }); // Resolve dictionary results if success, resolve empty array if failed
		default:
			return false;
	}
});}


// Entry function < from app.js
module.exports = (req, res) => {
	// Initalize
	let language;
	let lookup; 
	let results;
	
	// Get query
	language = req.query.language;
	lookup = req.query.lookup;
	
	// Sanitize query
	language = req.sanitize(language);
	lookup = req.sanitize(lookup);
	
	// Start dictionary processing sequence
	// First and foremost, check whether user even searched for something
	if (lookup != undefined) {
		getDictionaryResults(language, lookup).then((results) => {
			if (results.length != 0) res.render('dictionary', {lookupSuccess: true, results: results, lookup: lookup, language: language}); // User entered a word that matches
			if (results.length == 0) res.render('dictionary', {lookupSuccess: false, lookup: lookup, language: language}); // User did not enter an actual word
		}, (err) => {res.send(err); });
	} else { // If a user did not even search for anything, then display webpage without results
		res.render('dictionary');
	}
}