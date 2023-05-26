// Imports
const JishoAPI = require('unofficial-jisho-api');
const Kyujitai = require('kyujitai');
const orthography = require('./orthography.js');
const romaji = require('romaji');
const kyujitai = new Kyujitai();

// Initialization
const jisho = new JishoAPI();

// Utility functions
// Shinjitai-Kyujitai kanji conversion
let formatKyujitai = (kanji) => {
	return kyujitai.encode(kanji);
}

// Check if number
let isNumber = (s) => {
	return !isNaN(s);
}

// fromKana API call wrapper with error detection
let toRomaji = (s) => {
	try { return romaji.fromKana(s); } catch { return s; }
}

// Check if word is modern-sounding
// idk!!! not working sorta for katakana detection
let isModern = (entry) => {
	if (/[\u30a0-\u30ff]/.test(entry.slug[0])) return true; // Detect katakana
	
	// Detect possible place names
	hit = false;
	entry.senses.forEach(sense => {
		sense.parts_of_speech.forEach(partOfSpeech => {
			if (partOfSpeech == 'Place') hit = true;
		});
	});
	if (hit == true) return true;
	
	return false;
}

// Convert written word from Japanese to Literary Minamic
let toLiteraryMinamic = (japanese, senses) => {
	let literaryMinamic; // Initialize
	
	//TODO
	
	literaryMinamic = japanese;
	
	// Format sub-particles within word

	literaryMinamic = literaryMinamic.replace(/(?<=[\u4e00-\u9faf\u3400-\u4dbf])の/, '之');
	literaryMinamic = literaryMinamic.replace(/(?<=[\u4e00-\u9faf\u3400-\u4dbf])に/, '入');
	literaryMinamic = literaryMinamic.replace(/(?<=[\u4e00-\u9faf\u3400-\u4dbf])で/, '出');
	
	// Check for presence of I adjective
	senses.forEach(sense => {
		sense.parts_of_speech.forEach(partOfSpeech => {
			if (partOfSpeech == 'I-adjective (keiyoushi)') literaryMinamic = literaryMinamic.replace(/(?<=^[\u4e00-\u9faf\u3400-\u4dbf|し])い/, formatKyujitai('的'));
		});
	});
	
	//literaryMinamic = orthography.kana(literaryMinamic); // Pass any stray kana through
	
	// Trim hiragana occuring after kanji
	// Check if first character is kanji, if so, then trim the trailing hiragana
	if (/[\u4e00-\u9faf\u3400-\u4dbf]/.test(literaryMinamic[0])) {
		// Catch-all (trim the hiragana!!)
		literaryMinamic = literaryMinamic.replace(/[\u3040-\u309f]/g, '');
	}
	
	return literaryMinamic;
}

// Format the results to be sent to client
let formatResults = (raw) => {
	// Perform sanity check
	if (typeof raw === undefined) return false;
	if (raw.data.length == 0) return false;
	if (isNumber(raw.data[0].slug[0])) return false;
	
	// Initialize results
	let results = []; // Initialize results that will be sent to client
	
	// For every entry in search results
	raw.data.forEach(rawResult => {
		// Perform sanity check for each raw result
		// Omit entries with malformed slugs (like numbers and etc) from the results
		if (isNumber(rawResult.slug[0])) return;
		// Omit entries which sound modern
		if (isModern(rawResult)) return;
		// Omit entries where part of speech cannot be found
		//if (rawResult.senses[0].parts_of_speech.length == 0) return;
		
		//console.log(rawResult);
		
		let result = {};
		
		// Add slug (reverse-search term)
		result.slug = toLiteraryMinamic(rawResult.slug, rawResult.senses);
		
		// Add native that is displayed
		if (rawResult.japanese[0].word != undefined) result.native = toLiteraryMinamic(rawResult.japanese[0].word, rawResult.senses);
		if (rawResult.japanese[0].word == undefined) result.native = orthography.kana(rawResult.japanese[0].reading); // Kana-only
		
		
		// Add transcriptions
		result.transcriptions = [];
		result.transcriptions[0] = {}; // Format kana reading
		result.transcriptions[0].name = 'Kana';
		result.transcriptions[0].transcription = orthography.kana(rawResult.japanese[0].reading);
		
		result.transcriptions[1] = {}; // Format romaji reading
		result.transcriptions[1].name = 'Romaji';
		result.transcriptions[1].transcription = orthography.romaji(toRomaji(orthography.kana(rawResult.japanese[0].reading)));
		
		// Add modern Japanese equivelent
		result.equivelents = [];
		result.equivelents[0] = {};
		result.equivelents[0].name = 'Japanese';
		if (rawResult.japanese[0].word != undefined) result.equivelents[0].equivelent = rawResult.japanese[0].word; // If kanji is supplied
		if (rawResult.japanese[0].word == undefined) result.equivelents[0].equivelent = rawResult.japanese[0].reading; // Kana-only
		result.equivelents[0].reading = rawResult.japanese[0].reading;
		
		// Add whether word is common
		result.isCommon = rawResult.is_common;
		
		// Add senses
		result.senses = [];
		rawResult.senses.forEach(rawSense => {
			let sense = {};
			let invalid;
			
			// Add coining (currently undefined)
			sense.coining = undefined;
			
			// Add english definition
			sense.definitions = [];
			rawSense.english_definitions.forEach(rawDefinition => {
				sense.definitions.push(rawDefinition);
			});
			
			// Add part of speech
			sense.partsOfSpeech = [];
			rawSense.parts_of_speech.forEach(partOfSpeech => {
				if (partOfSpeech == 'Wikipedia definition') invalid = true; // If word pertains to something real-world, we don't want that there
				sense.partsOfSpeech.push(partOfSpeech);
			});
			
			/**
			// Add synonyms
			sense.synonyms = [];
			rawSense.see_also.forEach(synonym => {
				sense.synonyms.push();
			});
			
			// Add antonyms
			sense.antonyms = [];
			rawSense.antonyms.forEach(antonym => {
				sense.antonyms.push();
			});
			**/
			
			// Add sense to senses array, if array hasn't been invalidated
			if (!invalid) result.senses.push(sense);
		});
		
		// Add result to the table of search results
		results.push(result);
	});
	
	// Reverse the order of results for formatting reasons
	results = results.reverse();
	
	return results;
}

module.exports = (lookup) => { return new Promise((resolve, reject) => {
	// Search for phrase in Japanese
	jisho.searchForPhrase(`"${lookup}"`).then(r => {
		// Attempt to get results
		let results = formatResults(r);
		
		if (results) resolve(results);
		if (!results) reject('Invalid input');
	});
});}