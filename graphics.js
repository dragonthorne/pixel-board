/* if you're changing the screen size, make sure the variables
/* match --board-width and --board-width in styles.css
/* 
/* also, define framerate in frames per second
/* (i.e. a value of 60 means that it will be running at 60 fps)
/* NOTE TO SELF: when done, set res to be 480x270 & fps to either 30 or 60
/*/
const FRAMERATE      = 5;
const SCREEN_WIDTH   = 20;
const SCREEN_HEIGHT  = 15;
const SCREEN_ELEMENT = document.getElementById("board-container");
const PIXEL_GRID     = [];

function run () {
    setup();
    startProgram();
    beginDrawLoop();
}

//--SETUP FUNCTIONS
function setup () {
    placePxlContainers();
    fillPxlContainers();
    fillPxlGrid();
}

function placePxlContainers () {
    for (let i = 0; i < SCREEN_WIDTH; i++) {
        SCREEN_ELEMENT.innerHTML += "<div class=\"pxl-container\"></div>";
    }
}

function fillPxlContainers () {
    let containers = document.getElementsByClassName("pxl-container");
    for (let i = 0; i < SCREEN_WIDTH; i++) {
        for (let j = 0; j < SCREEN_HEIGHT; j++) {
            containers[i].innerHTML += `<div class="pxl" id="${getPxlId(i,j)}"></div>`;
        }
    }
}

function fillPxlGrid () {
    for (let i = 0; i < SCREEN_WIDTH; i++) {
        PIXEL_GRID[i] = [];
        for (let j = 0; j < SCREEN_HEIGHT; j++) {
            PIXEL_GRID[i][j] = {"value":BLACK,"layer":0};
        }
    }
}

//--HELPER FUNCTIONS
function getPxlId (x,y) {
    return `${x}x${y}y`;
}

function getPxlElement (x,y) {
    return document.getElementById(getPxlId(x,y));
}

function getGridPxl (x,y) {
    return PIXEL_GRID[x][y];
}

function drawHelper (arr, x) {
    for (let y = 0; y < arr.length; y++) {
        drawPixel(x,y);
    }
}

//--DRAW FUNCTIONS
function beginDrawLoop () {
    setInterval(drawLoop, 1000/FRAMERATE)
}

function drawLoop () {
    if (drawLoopPaused) return;
    draw();
}

function draw () {
    resetLayers();
    stepProgram();
    writeSpriteList();
    PIXEL_GRID.forEach(drawHelper);
}

function drawPixel (x,y) {
    getPxlElement(x,y).style.backgroundColor = COLOR_PALETTE[getGridPxl(x,y).value];
}

//--PIXEL GRID WRITE FUNCTIONS
function resetLayers () {
    PIXEL_GRID.forEach((Arr) => {
        Arr.forEach((obj) => {
            obj.layer = 0;
        })
    })
}

function writeSpriteList () {
    for (let sprite in SPRITE_LIST) {
        writeSpriteToGrid(sprite);
    }
}

function writeSpriteToGrid (spriteKey) {
    let sprite = SPRITE_LIST[spriteKey];
    if (!sprite.visible) {return;}
    let spriteGrid = sprite.spriteData;
    let originX = sprite.originX;
    let originY = sprite.originY;
    for (let offsetX = 0; offsetX < spriteGrid.length; offsetX++) {
        if (originX + offsetX >= SCREEN_WIDTH) {break;}
        let x = originX + offsetX;
        for (let offsetY = 0; offsetY < spriteGrid[offsetX].length; offsetY++) {
            if (originY + offsetY >= SCREEN_HEIGHT) {break;}
            let y = originY + offsetY;
            writePxlToGrid(x,y,sprite.layer,spriteGrid[offsetX][offsetY]);
        }
    } 
}

function writePxlToGrid (x,y,layer,color) {
    let gridPxl = getGridPxl(x,y);
    if (layer < gridPxl.layer || color == gridPxl.value || color == -1) {return;}
    if (color < 0 || color >= COLOR_PALETTE.length) {color = BLACK;}
    gridPxl.value = color;
    if (gridPxl.layer == layer) {return;}
    gridPxl.layer = layer;
}

//--DEBUG
let drawLoopPaused = false;

function pauseDrawLoop () {
    drawLoopPaused = !drawLoopPaused;
}

/* ⢀⡴⠑⡄⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
/* ⠸⡇⠀⠿⡀⠀⠀⠀⣀⡴⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
/* ⠀⠀⠀⠀⠑⢄⣠⠾⠁⣀⣄⡈⠙⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀
/* ⠀⠀⠀⠀⢀⡀⠁⠀⠀⠈⠙⠛⠂⠈⣿⣿⣿⣿⣿⠿⡿⢿⣆⠀⠀⠀⠀⠀⠀⠀
/* ⠀⠀⠀⢀⡾⣁⣀⠀⠴⠂⠙⣗⡀⠀⢻⣿⣿⠭⢤⣴⣦⣤⣹⠀⠀⠀⢀⢴⣶⣆
/* ⠀⠀⢀⣾⣿⣿⣿⣷⣮⣽⣾⣿⣥⣴⣿⣿⡿⢂⠔⢚⡿⢿⣿⣦⣴⣾⠁⠸⣼⡿
/* ⠀⢀⡞⠁⠙⠻⠿⠟⠉⠀⠛⢹⣿⣿⣿⣿⣿⣌⢤⣼⣿⣾⣿⡟⠉⠀⠀⠀⠀⠀
/* ⠀⣾⣷⣶⠇⠀⠀⣤⣄⣀⡀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀
/* ⠀⠉⠈⠉⠀⠀⢦⡈⢻⣿⣿⣿⣶⣶⣶⣶⣤⣽⡹⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀
/* ⠀⠀⠀⠀⠀⠀⠀⠉⠲⣽⡻⢿⣿⣿⣿⣿⣿⣿⣷⣜⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀
/* ⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣶⣮⣭⣽⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀
/* ⠀⠀⠀⠀⠀⠀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀
/* ⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀
/* ⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
/* ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⠿⠿⠿⠿⠛⠉
/* 
/* you might be wondering, why is this here?
/* well, i was bored lmao
/*/

run();