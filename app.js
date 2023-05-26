//require('./scripts/dictionary/dictionaries/minami.js')('ceo').then((results) => { console.log(results);}, (err) => { console.log(err); }); // TEST

// Import other scripts
const config = require('./config.js');
const dictionary = require('./scripts/dictionary/dictionary.js');

// Requires
const fs = require('fs');
const yaml = require('js-yaml');
const winston = require('winston')
const express = require("express");
const expressSanitizer = require('express-sanitizer');

// Set up webserver
const app = express();
const port = process.env.PORT || config.port;

app.set('view engine', 'ejs'); // User EJS as template engine
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use('/static', express.static(__dirname + '/static')); // Use static folder

// Log interactions
/* // TEMP COMMENTED
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)
function logRequest(req, res, next) {
    logger.info(req)
    next()
}
app.use(logRequest)
function logError(err, req, res, next) {
    logger.error(err)
    next()
}
app.use(logError)
*/



// R O U T E S ---------------

// Home
app.get("/", (req, res) => {
	res.render('index');
});

// Transliterator
app.get("/transliterator", (req, res) => {
	res.render('transliterator');
});

// Dictionary
app.get("/dictionary", (req, res) => {		
	dictionary(req, res);
});


// Dictionary (OLD)
/*
app.get("/dictionary", (req, res) => {	
	// Get query
	let selectedLanguage = req.query.language;
	let lookup = req.query.lookup;
	
	// Sanitize query
	selectedLanguage = req.sanitize(selectedLanguage);
	lookup = req.sanitize(lookup);
	
	// Lookup definitions and meaning on JSON file
	let dictionary;
	
	// Determine language then select appropriate dictionary
	switch (selectedLanguage) {
		case 'Weskethian':
			try { // Try to retrieve .yml and pass to client
				const data = yaml.load(fs.readFileSync('data/dictionary/weskethian.yml', 'utf8'));
				dictionary = data;
				res.render('dictionary', {selectedLanguage: selectedLanguage, lookup: lookup, dictionary: dictionary});
			} catch (e) { // If error occured
				console.log(e);
				res.send(e);
			}
		
		case 'Vilden':
			try { // Try to retrieve .yml and pass to client
				const data = yaml.load(fs.readFileSync('data/dictionary/vilden.yml', 'utf8'));
				dictionary = data;
				res.render('dictionary', {selectedLanguage: selectedLanguage, lookup: lookup, dictionary: dictionary});
			} catch (e) { // If error occured
				console.log(e);
				res.send(e);
			}
		
		default:
			res.render('dictionary');
	}
});
*/

/*
// Dictionary with admin access (OLD)
app.post("/dictionary", (req, res) => {	
	// Get query
	
	let selectedLanguage = req.query.language;
	let lookup = req.query.lookup;
	// Get credentials
	const userName = req.sanitize(req.body.username);
	const passWord = req.sanitize(req.body.password); // idk why this is highlighted but ok
	
	console.log('POST /dictionary');
	console.log(userName, passWord);

	try { // Try to retrieve .yml of credentials
		const credentials = yaml.load(fs.readFileSync('data/login/credentials.yml', 'utf8'));
		
		console.log(credentials);
		
		let token; // Login token for client
		
		for (var i=0, len=credentials.length; i < len; i++) {
			if (userName == credentials[i].username && passWord == credentials[i].passWord) {
				console.log('user logged in succesfully')
			} else {
				res.send('your not an admin!!1');
				return;
			}
		}
		
		res.render('dictionary', {token: token});
	} catch (e) { // If error occured
		console.log(e);
		res.send(e);
	}
	
	res.send('Your not an admin!!111<br/><iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>');
});
*/

app.listen(port, () => console.log(`App listening on port ${port}!`));
