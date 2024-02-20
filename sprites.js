/* if you need a different palette for your program,
/* replace the values in the palette file with the hex
/* values of the colors you want, separated by a line
/* break. whether or not they have a # does not matter.
/* 
/* the link to the palette i used is here:
/* https://lospec.com/palette-list/sanguepear-24
/* 
/* the default color palette is set to just black
/* and white as a fallback if it fails to load the
/* palette from palette.txt for any reason
/*/
const COLOR_PALETTE = ["#000000","#ffffff"];
fetch("palette.txt")
    .then(response => response.text())
    .then(text => {
        hexArr = text.split("\n");
        hexArr.forEach((hexStr, index) => {
            if (hexStr[0] != "#") {hexStr = "#" + hexStr;}
            COLOR_PALETTE[index] = hexStr;
        })
    })

/* set BLACK to the index of the color in the palette that
/* functions as the darkest color in the palette (for example,
/* in the palette that i'm using, black is index 0)
/*/
const BLACK         = 0;

/* the layer value determines the order in which it draws,
/* starting with the highest layer and going down. if two 
/* sprites have the same layer and are overlapping, whichever
/* is last in the SPRITE_LIST has priority. the default
/* solid-color background is on layer 0 and will always be
/* overwritten by any drawn pixels.
/*/
class Sprite {
    layer;
    #pxlArr;
    originX;
    originY;
    visible;
    constructor (layer,pxlArr) {
        this.layer = layer;
        this.pxlArr = pxlArr;
        this.originX = 0;
        this.originY = 0;
        this.visible = true;
    }
    get width () {
        return this.pxlArr.length
    }
    get height () {
        return this.pxlArr[0].length
    }
    get spriteData () {
        return this.pxlArr;
    }
    set spriteData (newArr) {
        this.pxlArr = newArr;
    }
    set origin (originArr) {
        this.originX = originArr[0];
        this.originY = originArr[1];
    }
}

class AnimatedSprite extends Sprite {
    currentFrame;
    frameCount;
    frames;
    constructor (layer,frames) {
        super(layer,frames[0]);
        this.frameCount = frames.length;
        this.frames = frames;
        this.currentFrame = 0;
    }
    get spriteData () {
        let ret = super.spriteData;
        this.updateFrame();
        return ret;
    }
    set spriteData (newData) {
        super.spriteData = newData;
    }
    updateFrame () {
        this.currentFrame++;
        if (this.currentFrame >= this.frameCount) {this.currentFrame = this.currentFrame % this.frameCount;}
        super.spriteData = this.frames[this.currentFrame];
    }
}

//--SPRITE_LIST FUNCTIONS
const SPRITE_LIST = {};

//add a sprite to the sprite list
function addSpriteToDraw (key,sprite) {
    SPRITE_LIST[key] = sprite;
}