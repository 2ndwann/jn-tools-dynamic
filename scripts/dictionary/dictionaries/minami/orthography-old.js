// Adjust Hepburn romaji reading to Minami orthography
module.exports.romaji = (d) => { 
	d = d.replace('f', 'h');
	d = d.replace('shi', 'si');
	//s = s.replace('ji', 'zi');
	d = d.replace('chi', 'ti');
	d = d.replace('tsu', 'tu');
	return d; 
};

// Adjust kana spellings
module.exports.kana = (s) => {
	if (s.length == 1) return s; // Do nothing if the word is only one kana long
	
	// TODO- WORD-INITIAL OCCURENCES
	// yochoon
	// Only do if length of input is more than 1
		//if (s.length == 1) return;
		s = s.slice(0, 3).replace('きゅう', 'きふ') + s.slice(3);
		s = s.slice(0, 3).replace('きょう', 'けふ') + s.slice(3);
		
		s = s.slice(0, 3).replace('ぎゅう', 'ぎふう') + s.slice(3);
		s = s.slice(0, 3).replace('ぎょう', 'げふ') + s.slice(3);
		
		s = s.slice(0, 3).replace('しゅう', 'しふう') + s.slice(3);
		s = s.slice(0, 3).replace('しょう', 'せふ') + s.slice(3);
		
		s = s.slice(0, 3).replace('じゅう', 'ぢふ') + s.slice(3);
		s = s.slice(0, 3).replace('じょう', 'ぜふ') + s.slice(3);
		
		s = s.slice(0, 3).replace('ちゅう', 'ちふ') + s.slice(3);
		s = s.slice(0, 3).replace('ちょう', 'てふ') + s.slice(3);
		
		s = s.slice(0, 3).replace('ぢゅう', 'ぢふ') + s.slice(3);
		s = s.slice(0, 3).replace('ぢょう', 'でふ') + s.slice(3);
							
		s = s.slice(0, 3).replace('にゅう', 'にふ') + s.slice(3);
		s = s.slice(0, 3).replace('にょう', 'ねふ') + s.slice(3);
							
		s = s.slice(0, 3).replace('ひゅう', 'ひふ') + s.slice(3);
		s = s.slice(0, 3).replace('ひょう', 'へふ') + s.slice(3);
							
		s = s.slice(0, 3).replace('びゅう', 'びふ') + s.slice(3);
		s = s.slice(0, 3).replace('びょう', 'べふ') + s.slice(3);
							
		s = s.slice(0, 3).replace('ぴゅう', 'ぴふ') + s.slice(3);
		s = s.slice(0, 3).replace('ぴょう', 'ぺふ') + s.slice(3);
							
		s = s.slice(0, 3).replace('みゅう', 'みふ') + s.slice(3);
		s = s.slice(0, 3).replace('みょう', 'めふ') + s.slice(3);
							
		s = s.slice(0, 2).replace('ゆう', 'いふ') + s.slice(2);
		s = s.slice(0, 2).replace('よう', 'えふ') + s.slice(2);
							
		s = s.slice(0, 3).replace('りゅう', 'りふ') + s.slice(3);
		s = s.slice(0, 3).replace('りょう', 'れふ') + s.slice(3);
		
		// yoon
		
		s = s.slice(0, 2).replace('きゃ', 'きや') + s.slice(2);
		s = s.slice(0, 2).replace('きゅ', 'きゆ') + s.slice(2);
		s = s.slice(0, 2).replace('きょ', 'きよ') + s.slice(2);
									
		s = s.slice(0, 2).replace('ぎゃ', 'ぎや') + s.slice(2);
		s = s.slice(0, 2).replace('ぎゅ', 'ぎゆ') + s.slice(2);
		s = s.slice(0, 2).replace('ぎょ', 'ぎよ') + s.slice(2);
									
		s = s.slice(0, 2).replace('しゃ', 'しや') + s.slice(2);
		s = s.slice(0, 2).replace('しゅ', 'しゆ') + s.slice(2);
		s = s.slice(0, 2).replace('しょ', 'しよ') + s.slice(2);
									
		s = s.slice(0, 2).replace('じゃ', 'ぢや') + s.slice(2);
		s = s.slice(0, 2).replace('じゅ', 'ぢゆ') + s.slice(2);
		s = s.slice(0, 2).replace('じょ', 'ぢよ') + s.slice(2);
									
		s = s.slice(0, 2).replace('ちゃ', 'ちや') + s.slice(2);
		s = s.slice(0, 2).replace('ちゅ', 'ちゆ') + s.slice(2);
		s = s.slice(0, 2).replace('ちょ', 'ちよ') + s.slice(2);
									
		s = s.slice(0, 2).replace('ぢゃ', 'ぢや') + s.slice(2);
		s = s.slice(0, 2).replace('ぢゅ', 'ぢゆ') + s.slice(2);
		s = s.slice(0, 2).replace('ぢょ', 'ぢよ') + s.slice(2);
									
		s = s.slice(0, 2).replace('にゃ', 'にや') + s.slice(2);
		s = s.slice(0, 2).replace('にゅ', 'にゆ') + s.slice(2);
		s = s.slice(0, 2).replace('にょ', 'によ') + s.slice(2);
									
		s = s.slice(0, 2).replace('ひゃ', 'ひや') + s.slice(2);
		s = s.slice(0, 2).replace('ひゅ', 'ひゆ') + s.slice(2);
		s = s.slice(0, 2).replace('ひょ', 'ひよ') + s.slice(2);
									
		s = s.slice(0, 2).replace('びゃ', 'びや') + s.slice(2);
		s = s.slice(0, 2).replace('びゅ', 'びゆ') + s.slice(2);
		s = s.slice(0, 2).replace('びょ', 'びよ') + s.slice(2);
									
		s = s.slice(0, 2).replace('ぴゃ', 'ぴや') + s.slice(2);
		s = s.slice(0, 2).replace('ぴゅ', 'ぴゆ') + s.slice(2);
		s = s.slice(0, 2).replace('ぴょ', 'ぴよ') + s.slice(2);
									
		s = s.slice(0, 2).replace('りゃ', 'りや') + s.slice(2);
		s = s.slice(0, 2).replace('りゅ', 'りゆ') + s.slice(2);
		s = s.slice(0, 2).replace('りょ', 'りよ') + s.slice(2);
									
		// choon                       
									
		s = s.slice(0, 2).replace('おう', 'あふ') + s.slice(2);
		s = s.slice(0, 2).replace('こう', 'かふ') + s.slice(2);
		s = s.slice(0, 2).replace('ごう', 'がふ') + s.slice(2);
		s = s.slice(0, 2).replace('そう', 'さふ') + s.slice(2);
		s = s.slice(0, 2).replace('ぞう', 'ざふ') + s.slice(2);
		s = s.slice(0, 2).replace('とう', 'たふ') + s.slice(2);
		s = s.slice(0, 2).replace('どう', 'だふ') + s.slice(2);
		s = s.slice(0, 2).replace('ほう', 'はふ') + s.slice(2);
		s = s.slice(0, 2).replace('ぼう', 'ばふ') + s.slice(2);
		s = s.slice(0, 2).replace('ぽう', 'ぱふ') + s.slice(2);
		s = s.slice(0, 2).replace('のう', 'なふ') + s.slice(2);
		s = s.slice(0, 2).replace('もう', 'まふ') + s.slice(2);
		s = s.slice(0, 2).replace('ろう', 'らふ') + s.slice(2);
		
		// "Single-syllable"
		//s = s.slice(0, 2) + s.slice(2).replace('か', 'くわ');
		//s = s.slice(0, 2) + s.slice(2).replace('が', 'ぐわ');
		
		// BEGIN WORD-MEDIAL OCCURENCES
		
		// yochoon
		
		s = s.slice(0, 3) + s.slice(3).replace('きゅう', 'きう');
		s = s.slice(0, 3) + s.slice(3).replace('きょう', 'けう');
		
		s = s.slice(0, 3) + s.slice(3).replace('ぎゅう', 'ぎう');
		s = s.slice(0, 3) + s.slice(3).replace('ぎょう', 'げう');
		
		s = s.slice(0, 3) + s.slice(3).replace('しゅう', 'しう');
		s = s.slice(0, 3) + s.slice(3).replace('しょう', 'せう');
		
		s = s.slice(0, 3) + s.slice(3).replace('じゅう', 'じう');
		s = s.slice(0, 3) + s.slice(3).replace('じょう', 'ぜう');
		
		s = s.slice(0, 3) + s.slice(3).replace('ちゅう', 'ちう');
		s = s.slice(0, 3) + s.slice(3).replace('ちょう', 'てう');
		
		s = s.slice(0, 3) + s.slice(3).replace('ぢゅう', 'ぢう');
		s = s.slice(0, 3) + s.slice(3).replace('ぢょう', 'でう');
		
		s = s.slice(0, 3) + s.slice(3).replace('にゅう', 'にう');
		s = s.slice(0, 3) + s.slice(3).replace('にょう', 'ねう');
		
		s = s.slice(0, 3) + s.slice(3).replace('ひゅう', 'ひう');
		s = s.slice(0, 3) + s.slice(3).replace('ひょう', 'へう');
		
		s = s.slice(0, 3) + s.slice(3).replace('びゅう', 'びう');
		s = s.slice(0, 3) + s.slice(3).replace('びょう', 'べう');
		
		s = s.slice(0, 3) + s.slice(3).replace('ぴゅう', 'ぴう');
		s = s.slice(0, 3) + s.slice(3).replace('ぴょう', 'ぺう');
		
		s = s.slice(0, 3) + s.slice(3).replace('みゅう', 'みう');
		s = s.slice(0, 3) + s.slice(3).replace('みょう', 'めう');
		
		s = s.slice(0, 2) + s.slice(2).replace('ゆう', 'いう');
		s = s.slice(0, 2) + s.slice(2).replace('よう', 'えう');
		
		s = s.slice(0, 3) + s.slice(3).replace('りゅう', 'りう');
		s = s.slice(0, 3) + s.slice(3).replace('りょう', 'れう');
		
		// yoon
		
		s = s.slice(0, 2) + s.slice(2).replace('きゃ', 'きや');
		s = s.slice(0, 2) + s.slice(2).replace('きゅ', 'きゆ');
		s = s.slice(0, 2) + s.slice(2).replace('きょ', 'きよ');
		
		s = s.slice(0, 2) + s.slice(2).replace('ぎゃ', 'ぎや');
		s = s.slice(0, 2) + s.slice(2).replace('ぎゅ', 'ぎゆ');
		s = s.slice(0, 2) + s.slice(2).replace('ぎょ', 'ぎよ');
		
		s = s.slice(0, 2) + s.slice(2).replace('しゃ', 'しや');
		s = s.slice(0, 2) + s.slice(2).replace('しゅ', 'しゆ');
		s = s.slice(0, 2) + s.slice(2).replace('しょ', 'しよ');
		
		s = s.slice(0, 2) + s.slice(2).replace('じゃ', 'じや');
		s = s.slice(0, 2) + s.slice(2).replace('じゅ', 'じゆ');
		s = s.slice(0, 2) + s.slice(2).replace('じょ', 'じよ');
		
		s = s.slice(0, 2) + s.slice(2).replace('ちゃ', 'ちや');
		s = s.slice(0, 2) + s.slice(2).replace('ちゅ', 'ちゆ');
		s = s.slice(0, 2) + s.slice(2).replace('ちょ', 'ちよ');
		
		s = s.slice(0, 2) + s.slice(2).replace('ぢゃ', 'ぢや');
		s = s.slice(0, 2) + s.slice(2).replace('ぢゅ', 'ぢゆ');
		s = s.slice(0, 2) + s.slice(2).replace('ぢょ', 'ぢよ');
		
		s = s.slice(0, 2) + s.slice(2).replace('にゃ', 'にや');
		s = s.slice(0, 2) + s.slice(2).replace('にゅ', 'にゆ');
		s = s.slice(0, 2) + s.slice(2).replace('にょ', 'によ');
		
		s = s.slice(0, 2) + s.slice(2).replace('ひゃ', 'ひや');
		s = s.slice(0, 2) + s.slice(2).replace('ひゅ', 'ひゆ');
		s = s.slice(0, 2) + s.slice(2).replace('ひょ', 'ひよ');
		
		s = s.slice(0, 2) + s.slice(2).replace('びゃ', 'びや');
		s = s.slice(0, 2) + s.slice(2).replace('びゅ', 'びゆ');
		s = s.slice(0, 2) + s.slice(2).replace('びょ', 'びよ');
		
		s = s.slice(0, 2) + s.slice(2).replace('ぴゃ', 'ぴや');
		s = s.slice(0, 2) + s.slice(2).replace('ぴゅ', 'ぴゆ');
		s = s.slice(0, 2) + s.slice(2).replace('ぴょ', 'ぴよ');
		
		s = s.slice(0, 2) + s.slice(2).replace('りゃ', 'りや');
		s = s.slice(0, 2) + s.slice(2).replace('りゅ', 'りゆ');
		s = s.slice(0, 2) + s.slice(2).replace('りょ', 'りよ');
		
		s = // choon
		s = s.slice(0, 2) + s.slice(2).replace('おう', 'あう');
		s = s.slice(0, 2) + s.slice(2).replace('こう', 'かう');
		s = s.slice(0, 2) + s.slice(2).replace('ごう', 'がう');
		s = s.slice(0, 2) + s.slice(2).replace('そう', 'さう');
		s = s.slice(0, 2) + s.slice(2).replace('ぞう', 'ざう');
		s = s.slice(0, 2) + s.slice(2).replace('とう', 'たう');
		s = s.slice(0, 2) + s.slice(2).replace('どう', 'だう');
		s = s.slice(0, 2) + s.slice(2).replace('ほう', 'はう');
		s = s.slice(0, 2) + s.slice(2).replace('ぼう', 'ばう');
		s = s.slice(0, 2) + s.slice(2).replace('ぽう', 'ぱう');
		s = s.slice(0, 2) + s.slice(2).replace('のう', 'なう');
		s = s.slice(0, 2) + s.slice(2).replace('もう', 'まう');
		s = s.slice(0, 2) + s.slice(2).replace('ろう', 'らう');
	
	s = s.slice(0, 1) + s.slice(1).replace('わ', 'は');
	
	// Non-initial non-end medial vowel > h-vowel shift
	s = s.at(0) + s.slice(1, -1).replace('あ', 'わ') + s.slice(-1);
	s = s.at(0) + s.slice(1, -1).replace('い', 'ひ') + s.slice(-1);
	//s = s.at(0) + s.slice(1, -1).replace('う', 'ふ') + s.slice(-1);
	s = s.at(0) + s.slice(1, -1).replace('え', 'へ') + s.slice(-1);
	s = s.at(0) + s.slice(1, -1).replace('お', 'ほ') + s.slice(-1);
	
	// END WORD-MEDIAL OCCURENCES

	// -n
	s = s.replace('ん', 'む');

	return s;
};

