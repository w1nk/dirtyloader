this repo contains some experiments in hiding code in data.  i wanted to see if i could fetch javascript and execute it in a way that was non obvious to users and interested plugins.  this repo contains the experiment:

index.html and the things inside of it (index.js) will encode a string into the LSBs of the pixel data of a PNG.  the data is then drawn to a canvas (labeled lol'd) which can be saved and put into the extractor/loader.  that exists in poc/ , if you replace encd.png with a different one, your code will run.

this stuff isn't clean or well organized , it was exactly enough to get it working.  the encoder sucks since it uses putImageData which comes with issues on the alpha channel (hence the red bar).  a better encoder should/would be able to also use more than one bit per color channel.