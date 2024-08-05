//define in-game variables
let string;
let splitString;
let counter;
let canvasSize;
let lineSpacing;
let charObjArray;
let spaceCounter;
let isEndGame;
let isTableShown;
let isTimeShown;

//define database variables
let objectStatsArray = [];
let tableDatabase;

//define radio variables
let statsRadio, radioContainer;
let radioVal = "All";
let isRadioSelected;

//define slider variables
let vol = 0.05;
let slider;
let musicNoteImg;

//define zen values
let inp;
let isZenMode;

//define rgbtype variables
let wordArray, words;
let score;
let foundWord;
let gameOver;
let rgbInput1, rgbButton1, rgbButton2;
let isRgbMode;

//initialise UI variables
let buttonHeight = 160;
let backingWidth = 150;
let done = 255;

//initialise time variables
let currentTime;
let rateFrame = 2.5;
let seedTime = 0;

//setup files in canvas
function preload() {
    //assign text files to RacerType
    string = loadStrings("strings.txt");

    //assign text files to RGBType
    wordArray = loadStrings("words.txt");
    words = loadStrings("words.txt");

    //assign image
    musicNoteImg = loadImage("MusicNote.jpg");

    //set acceptable song format to mp3
    soundFormats("mp3");

    //initialise songs
    song = loadSound("Undertale.mp3");
    songWin = loadSound("ClashRoyale.mp3");
    songLose = loadSound("PacMan.mp3");
    songRgb = loadSound("AmongUs.mp3");
}