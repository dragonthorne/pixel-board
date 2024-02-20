//put all things you need to do for setup in the program
function startProgram () {
    addSpriteToDraw("bg",BLACK_BG);
    SPRITE_LIST.bg.origin = [1,1];
    addSpriteToDraw("debug",DEBUG_ANIM);
}

//what the program does each step
function stepProgram () {
    SPRITE_LIST.debug.visible = !SPRITE_LIST.debug.visible;
}

//add your sprites here
const BLACK_BG = new Sprite(0,[
    [0,0],
    [0,0],
])
const DEBUG = new Sprite(0,[
    [1,2],
    [2,3]
])
const DEBUG_ANIM = new AnimatedSprite(0,[
    [
        [-1,-1,-1],
        [-1, 1, 2],
        [-1, 2, 3]
    ],
    [
        [-1,-1,-1],
        [-1, 7, 8],
        [-1, 8, 9]
    ]
])