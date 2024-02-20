# pixel-board
a rudimentary version of a computer screen made in pure html/css/js

if you just want to make a program with the default settings, all you have to do is edit program.js

if you want different settings though, you can change the palette by replacing the list of hex codes in palette.txt with your own hex list,
though if the "black" color (or whatever color you want to act as the default color for the palette is) is not the first in the list,
you can change the BLACK constant in sprite.js to the index in the list that your default color is.

if you want to change the framerate or resolution, it's at the very top of graphics.js.

kinda sucks to use for anything other than fancy pixel art or very low resolution animations, because as it turns out,
chrome (and i assume other browsers) REALLY do not like it when you put that many div elements on one page.
480x270, AKA 1/16 of hd resolution, requires 130k div elements, and if you decided you wanted full hd, you'd be 
forcing it to render over 2 million div elements, which is, to put it lightly, a fuckload. But that's without even
CONSIDERING the fact that it's also gotta render all of that in 15 fps if you leave the framerate at default.

all in all, shit sucks but it was very fun to program so i don't really give a shit.
