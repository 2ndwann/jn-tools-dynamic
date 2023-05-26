let transliterateToVildenRunic = (s) => {
	s = s.toLowerCase();
	s = s.replace(/a/g, 'ᛆ');
	s = s.replace(/b/g, 'ᛒ');
	s = s.replace(/c/g, 'ᛍ');
	s = s.replace(/d/g, 'ᛑ');
	s = s.replace(/e/g, 'ᛂ');
	s = s.replace(/f/g, 'ᚠ');
	s = s.replace(/g/g, 'ᚵ');
	s = s.replace(/h/g, 'ᚼ');
	s = s.replace(/i/g, 'ᛁ');
	s = s.replace(/j/g, 'ᚤ');
	s = s.replace(/k/g, 'ᚴ');
	s = s.replace(/l/g, 'ᛆ');
	s = s.replace(/m/g, 'ᛘ');
	s = s.replace(/n/g, 'ᚿ');
	s = s.replace(/o/g, 'ᚮ');
	s = s.replace(/p/g, 'ᛔ');
	s = s.replace(/q/g, 'ᛩ');
	s = s.replace(/r/g, 'ᚱ');
	s = s.replace(/s/g, 'ᛋ');
	s = s.replace(/t/g, 'ᛐ');
	s = s.replace(/u/g, 'ᚢ');
	s = s.replace(/v/g, 'ᚡ');
	s = s.replace(/w/g, 'ᚥ');
	s = s.replace(/x/g, 'ᛪ');
	s = s.replace(/y/g, 'ᚤ');
	s = s.replace(/z/g, 'ᛎ');
  
	return s;
}