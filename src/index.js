function decode(host) {
	var buf = [];
	var byte = "";
	var hostindex = 0;

	for(var i = 0; i < host.length; i++) {

		if( (i+1) % 4 == 0) continue;

		var curbyte = host[i];
		var bit = curbyte & 0x1;

		if(byte.length == 8) {
			console.log(i + ": " + byte)

			if(parseInt(byte,2) == 255) {
				return buf
			}

			buf.push(String.fromCharCode(parseInt(byte, 2)));
			byte = ""
		}

		byte += "" + bit;
	}
	console.log(byte)

	return buf
}

function encode(host, guest) {
	if(guest >= ( (host - 8) /8) ) {
		return; // can't hold in lsb
	}
	console.log(host)
	console.log(guest)

	var hostindex = 0;

	for(var i = 0; i < guest.length; i++) {
		var guestbyte = guest[i].charCodeAt();
		console.log("enc byte: " + guestbyte)
		for(var j = 7; j >= 0; j--) {
			var bit = (guestbyte >> j) & 0x1;
			console.log('bit['+j+']: ' + bit)
			var hostbyte = host[hostindex];
			console.log('host before: ' + hostbyte)
			if(bit) {
				 hostbyte = hostbyte | 1;
			}
			else {
				hostbyte = hostbyte & ~1;
			}
			console.log('host after: ' + hostbyte)

			if( (hostindex+1) % 4 == 0) {
				host[hostindex] = 255;
				hostindex++;
			}

			host[hostindex] = hostbyte;

			hostindex++;

		}
	}

	console.log("terminating host")
	
	// put terminator
	var guestbyte = 255;
	 console.log("enc byte: " + guestbyte + " at pos " + hostindex)
	for(var j = 0; j < 8; j++) {
		var bit = (guestbyte >> j) & 0x1;
		 console.log('bit['+j+']: ' + bit)
		var hostbyte = host[hostindex];
		 console.log('host before: ' + hostbyte)
		if(bit) {
			 hostbyte = hostbyte | 1;
		}
		else {
			hostbyte = hostbyte & ~1;
		}
		console.log('host after: ' + hostbyte)

		if( (hostindex+1) % 4 == 0) {
			host[hostindex] = 255;
			hostindex++;
		}

		host[hostindex] = hostbyte;

		hostindex++;
	}
	while( (hostindex+1) % 4 != 0) hostindex++;

	host[hostindex] = 255;

	console.log("final encode:")
	console.log(host)

	return host;
}

window.addEventListener('load', function() {
	var canvas = document.getElementById('encimage');
	var context = canvas.getContext('2d');
	var img = document.getElementById('lol');

	canvas.width = img.width;
	canvas.height = img.height;
	context.drawImage(img, 0, 0 );
	console.log("width: " + img.width)
	console.log("height: " + img.height)
	var myData = context.getImageData(0, 0, img.width, img.height);

	console.log('before first byte: ' + myData.data[0])
	// console.log(myData);
	var lol = encode(myData.data, "for(var i=0;i<10;i++){console.log('up in ur base executing loops: '+i)}");

	var lolimg = new ImageData(lol, img.width, img.height)
    context.putImageData(lolimg, 0, 0);


	// var dataURL = canvas.toDataURL("image/png");
	// document.write("<img src='" + dataURL + "' alt='from canvas'/>");


	// lets try to extract some data now
	console.log("=========== extraction");

	// var hostdata = context.getImageData(0, 0, img.width, img.height);
	// console.log(hostdata)

	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	var img = document.getElementById('enc');

	canvas.width = img.width;
	canvas.height = img.height;
	context.drawImage(img, 0, 0 );
	console.log("width: " + img.width)
	console.log("height: " + img.height)
	var myData = context.getImageData(0, 0, img.width, img.height);

	console.log(myData.data);
	var lol = decode(myData.data)
	console.log(lol.join(''))
	eval(lol.join(''))
});

