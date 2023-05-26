// Dictionary (CLIENT)

$(document).ready(() => {
	// Hide unnessescary things
	$('.search-results-show-only').hide();
	$('#error').hide();
	
	// If user search for something, at least fix their inputs for them
	if (typeof lookupSuccess !== undefined) {
		$('#select-language').val(language).change();
		$('#lookup').val(lookup);
	}
	
	if (lookupSuccess == false) {
		$('#error').show();
		$('#error').find('p').html('<strong>Error:</strong> Unable to find definition \'' + lookup + '\'');
		return;
	}
	
	// Show result count
	$('#result-count').show();
	$('#result-count').html(results.length + ' results');
	
	// Initialize templates
	let resultEntryTemplate = $('#search-result-entry-template'); // Result entry template
	let senseEntryTemplate = $('#sense-entry-template');
	
	// Load results into browser
	results.forEach(result => {
		console.log(result); // Test
		
		// Show results parent container
		$('.search-results-show-only').show();
		
		// Duplicate and add new entry
		let resultEntry = resultEntryTemplate.clone()
			.removeAttr('id')		
			.prependTo('#search-results');
		
		// Initialize main word entry
		wordEntry = resultEntry.find('.word');
		
		// Add native word
		resultEntry.find('.native').html(result.native);
		
		// Add whether word is common (if applicable)
		if (result.isCommon) wordEntry.append(`<span style="font-style:italic; font-size:11px; margin-top:-12px;">Common word</span><br/>`);
		
		// Add transcriptions (if applicable)
		if (result.transcriptions) {
			wordEntry.append('<br/>');
			wordEntry.append('<span style="font-weight:bold; font-size:11px;">Transcriptions</span><br/>');
			result.transcriptions.forEach(transcription => {
				wordEntry
					.append('<span style="font-size:13px;"><span style="font-weight:bold">' + transcription.name + ':</span> ' + transcription.transcription + '<br/></span>');
			});
		}
		
		// Add equivelents (if applicable)
		if (result.equivelents) {
			wordEntry.append('<br/>');
			wordEntry.append('<span style="font-weight:bold; font-size:11px;">Equivelents</span><br/>');
			result.equivelents.forEach(equivelent => {
				wordEntry
					.append('<span style="font-size:13px;"><span style="font-weight:bold">' + equivelent.name + ':</span> ' + equivelent.equivelent + '【' + equivelent.reading + '】<br/></span>');
			});
		}
		
		// Add senses
		result.senses.forEach(sense => {
			// Duplicate and add new entry
			let senseEntry = senseEntryTemplate.clone()
				.removeAttr('id')
				.prependTo(resultEntry.find('.senses'));
			
			// Add coining (if applicable)
			if (sense.coining) senseEntry.append(`<span style="font-style:italic; font-size:11px; margin-top:-12px;">${sense.coining}</span><br/>`);
			
			// Add parts of speech
			sense.partsOfSpeech.forEach(partOfSpeech => {
				if (!partOfSpeech) return; // If no part of speech, then return
				senseEntry.append(`<span style="font-size:11px; font-weight:bold;">${partOfSpeech}</span>`); // Add part of speech
				if (partOfSpeech != sense.partsOfSpeech.at(-1)) senseEntry.append('; '); // Add space between words
			});
			senseEntry.append('<br/>');
		
			// Add definitions
			sense.definitions.forEach(definition => {
				senseEntry.append(definition + '<br/>');
			});
		});
	});
	
	// Delete templates when done
	resultEntryTemplate.remove();
	senseEntryTemplate.remove();
});