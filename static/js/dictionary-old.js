// Show the list of all definitions for a particular language
let showAllDefinitions = () => {
	$('#definition-list').show();
	$('#expanded-definition').hide();
	$('#selected-language-supplementary-text').html(selectedLanguage);
	
	// Flush previous dictionary entries
	$('#dictionary-table tbody').empty();
	
	// Load dictionary onto visible table
	$('#table-supplementary-text').html(dictionary.vocabulary.length + ' documented definitions for ' + dictionary.name + '.<!--<br/>Click on a row to expand the definition.--></p>'); 
	
	// Load the dictionary entries
	for (var i=0, len=dictionary.vocabulary.length; i < len; i++) { // Go through each word, displaying its information...
		let nativeWordDisplay;
		
		if (dictionary.commonCharacterCanBeUsedAsDefault == true) { // Format how native words will be displayed based on whether language can use common characters or not
			$('#table-header-commonspeak').remove();
			$('#dictionary-table tbody').append('<tr><td class="commonspeak">' + dictionary.vocabulary[i].keywords[0] + '</td><td class="romanized" style="font-style:italic;">' + dictionary.vocabulary[i].word.romanized + '</td><td class="part-of-speech">' + dictionary.vocabulary[i].partOfSpeech + '</td><td><a href="/dictionary?language=' + selectedLanguage + '&lookup=' + dictionary.vocabulary[i].keywords[0] + '">View details</a></td></tr>');
		} else if (dictionary.commonCharacterCanBeUsedAsDefault == false && (dictionary.writingSystemType != 'alphabetic' || dictionary.writingSystemType != 'syllabic')) { 
			// Format the native word
			// TODO
			if (dictionary.name == 'Vilden') { // If the language is Vilden (it can certainly be transliterated, but I have to fix this for now!!)
				// Transliterate
				nativeWordDisplay = transliterateToVildenRunic(dictionary.vocabulary[i].word.romanized);
			} else {
				nativeWordDisplay = dictionary.vocabulary[i].word.native[0]; // NOTE TO SELF: if ever I have to implement this, DO IT AS AN ARRAY!!!
			}
			// Display entry with native word
			$('#dictionary-table tbody').append('<tr><td class="commonspeak">' + dictionary.vocabulary[i].keywords[0] + '</td><td class="native">' + nativeWordDisplay + '</td><td class="romanized" style="font-style:italic;">' + dictionary.vocabulary[i].word.romanized + '</td><td class="part-of-speech">' + dictionary.vocabulary[i].partOfSpeech + '</td><td><a href="/dictionary?language=' + selectedLanguage + '&lookup=' + dictionary.vocabulary[i].keywords[0] + '">View details</a></td></tr>');
		}
	}
}




// If user entered a keyword to search for, show the definitions
let showExpandedDefinition = (lookup) => {
	if (typeof dictionary === 'undefined') { return; } // Sanity check

	//$('#submit').attr('value', 'Show all definitions for ' + selectedLanguage); // Enable supplementary text
	
	// Search for the keywoard
	try {
		for (var i=0, len1=dictionary.vocabulary.length; i < len1; i++) { // Go through entire dictionary...
			for (var v=0, len2=dictionary.vocabulary[i].keywords.length; v < len2; v++) { // Go through all possible keywords in each word...
				if (dictionary.vocabulary[i].keywords[v].toLowerCase() == lookup.toLowerCase()) { // If a hit has been found, then do everything below
					let partOfSpeechDisplay, nativeDisplay, romanizedDisplay, definitionDisplay, coiningDisplay; // Initialize variables
				
					// Determine the text to format to the browser
					if (dictionary.vocabulary[i].partOfSpeech !== null) { partOfSpeechDisplay = dictionary.vocabulary[i].partOfSpeech } else { partOfSpeechDisplay = 'None'; }
					if (dictionary.commonCharacterCanBeUsedAsDefault == true) { // If language can use common characters as the default, then use it
						$('#expanded-definition-romanized').hide();
						nativeDisplay = dictionary.vocabulary[i].word.romanized;
					} else if (dictionary.commonCharacterCanBeUsedAsDefault == false && (dictionary.writingSystemType != 'alphabetic' || dictionary.writingSystemType != 'syllabic')) { // But if not...
						if (dictionary.name == 'Vilden') { // If the language is Vilden (it can certainly be transliterated, but I have to fix this for now!!)
							nativeDisplay = transliterateToVildenRunic(dictionary.vocabulary[i].word.romanized);
							$('#expanded-definition-romanized').html(dictionary.vocabulary[i].word.romanized);
						} else {
							nativeDisplay = dictionary.vocabulary[i].word.native[0]; // NOTE TO SELF: if ever I have to implement this, DO IT AS AN ARRAY!!!
							$('#expanded-definition-romanized').html(dictionary.vocabulary[i].word.romanized);
						}
					}
					if (dictionary.vocabulary[i].word.romanized !== null) { romanizedDisplay = dictionary.vocabulary[i].word.romanized } else { romanizedDisplay = 'None'; }
					if (dictionary.vocabulary[i].definition !== null) { definitionDisplay = dictionary.vocabulary[i].definition } else { definitionDisplay = dictionary.vocabulary[i].keywords[0] }
					if (dictionary.vocabulary[i].coining !== null) { coiningDisplay = dictionary.vocabulary[i].coining } else { coiningDisplay = 'Unknown'; }
				
					// Format the text to the browser
					$('#definition-list').hide();
					$('#expanded-definition').show();
					$('#expanded-definition-part-of-speech').html(partOfSpeechDisplay);
					$('#expanded-definition-native').html(nativeDisplay);
					$('#expanded-definition-romanized').html(romanizedDisplay);
					$('#expanded-definition-commonspeak').html(definitionDisplay);
					$('#expanded-definition-coining').html(coiningDisplay);
					
					// Adjust to contain only the nessescary information
					//TODO - NOTHING SHOULD BE HERE YET
					return;
				}
			}
		}	
	} catch (e) { console.log(e); } // If there was en error in doing everything above, then catch it.
	
	
	// If there was no hit by now, then that means that the definition was not found :(
	// If so, then tell the user that the definition was not found
	$('#error').show();
	$('#definition-list').hide();
	$('#expanded-definition').hide();
	$('#error-text').html('Definition for "' + lookup + '" not found.');
	// Then, show all the definitions to the user
	showAllDefinitions();
}



// Do all these DOM actions when the document is ready
$(document).ready(() => {
	// Hide and reset everything
	$('#definition-list').hide();
	$('#expanded-definition').hide();
	$('#error').hide();
	$('#language-info').hide();
	$('#dictionary-options').hide();
	
	// If no language was selected, then user will have to select the language. So thus, everything unnesescary will have to be hidden.
	if(typeof selectedLanguage === 'undefined') {
		$('#definition-container').hide();
		$('#row-container').removeClass('row');
		$('#language-selection-container').addClass('w-100');
		return;
	}
	
	// Show all the definitions by default if no query text has been present
	if (typeof selectedLanguage !== 'undefined') { 
		showAllDefinitions();
	}
	// Show a specific definition if a query text is present
	if (typeof lookup !== 'undefined') { 		
		showExpandedDefinition(lookup);
	}
	
	// Change default of select box to previously selected language, given that a dictionary is present on client
	if (typeof dictionary !== 'undefined') {
		$('#' + selectedLanguage).attr('selected', 'selected');
	}
	
	// If there is a dictionary loaded then:
	if (typeof dictionary !== 'undefined') {
		$('#language-info').show();
		$('#dictionary-options').show(); // (load dictionary options)
		$('#language-info-name').html(selectedLanguage);
		$('#language-info-desc').html(dictionary.description);
	}
	
});


// If dropdown changed, auto force form submission
$("#select-language").on('change', () => {
	$('form').submit();
});