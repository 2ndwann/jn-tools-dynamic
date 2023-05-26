let transliterateToRomanized = (s) => {
	s = s.toLowerCase();
	
	// Vilden runic
	s = s.replace(/ᛆ/g, 'a');
	s = s.replace(/ᛒ/g, 'b');
	s = s.replace(/ᛍ/g, 'c');
	s = s.replace(/ᛑ/g, 'd');
	s = s.replace(/ᛂ/g, 'e');
	s = s.replace(/ᚠ/g, 'f');
	s = s.replace(/ᚵ/g, 'g');
	s = s.replace(/ᚼ/g, 'h');
	s = s.replace(/ᛁ/g, 'i');
	s = s.replace(/ᚤ/g, 'j');
	s = s.replace(/ᚴ/g, 'k');
	s = s.replace(/ᛆ/g, 'l');
	s = s.replace(/ᛘ/g, 'm');
	s = s.replace(/ᚿ/g, 'n');
	s = s.replace(/ᚮ/g, 'o');
	s = s.replace(/ᛔ/g, 'p');
	s = s.replace(/ᛩ/g, 'q');
	s = s.replace(/ᚱ/g, 'r');
	s = s.replace(/ᛋ/g, 's');
	s = s.replace(/ᛐ/g, 't');
	s = s.replace(/ᚢ/g, 'u');
	s = s.replace(/ᚡ/g, 'v');
	s = s.replace(/ᚥ/g, 'w');
	s = s.replace(/ᛪ/g, 'x');
	s = s.replace(/ᚤ/g, 'y');
	s = s.replace(/ᛎ/g, 'z');
  
	return s;
}