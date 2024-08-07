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

//assign value to variables
function getVar() {
    //set array of variables to input into objects
    splitString = split(random(string), "");

    //set number of words in line
    spaceCounter = 0;

    //start indexing at 1
    counter = -1;

    //set up array for character objects
    charObjArray = [];

    //set up rgbType game
    score = 0;
    foundWord = false;
    gameOver = false;

    //remove rgb fields for other mode
    if (rgbInput1 != null) {
        //remove zen mode input
        rgbInput1.remove();
        rgbButton1.remove();
        rgbButton2.remove();
    }

    //set up user interface variables
    canvasSize = 800;
    lineSpacing = 50;

    //set game over checker
    isEndGame = false;

    //remove table if existent
    if (tableDatabase != null) {
        //remove tableDatabase
        tableDatabase.remove();
    }

    //Check if radio buttons existed
    if (radioContainer != null) {
        //call child node
        if (radioContainer.elt.childNodes.length > 0) {
            //remove child node
            radioContainer.elt.removeChild(statsRadio.elt);
        }
    }

    //remove textarea in zen mode if existent
    if (inp != null) {
        //remove zen mode input
        inp.remove();
    }

    //check if table being shown
    isTableShown = false;

    //check if timer shown
    isTimeShown = false;

    //check if it is zen mode
    isZenMode = false;

    //check if it is showing statistic
    isRadioSelected = false;

    //check if it is rgbType mode
    isRgbMode = false;

    //assign text files to RGBType
    wordArray = loadStrings("words.txt");

    //make box opaque
    done = 255;
}

//function triggered by submit button
function check() {
    if (gameOver == false) {
        //set checker to be false as check has not been run
        foundWord = false;

        //set up message
        noStroke();
        fill("lightgreen");
        rect(
            rgbButton2.x + rgbButton2.width,
            buttonHeight,
            backingWidth,
            rgbButton1.height
        );
        textAlign(LEFT);
        textSize(20);
        fill("black");

        if (words.includes(rgbInput1.value()) === true) {
            if (wordArray.includes(rgbInput1.value()) === true) {
                console.log("here");

                //remove value from wordArray
                wordArray.splice(wordArray.indexOf(rgbInput1.value()), 1);

                text(
                    "Correct!",
                    rgbButton2.x + rgbButton2.width + 10,
                    buttonHeight + 17.5
                );

                //add score
                score += 5;
            } else {
                text(
                    "Already found!",
                    rgbButton2.x + rgbButton2.width + 10,
                    buttonHeight + 17.5
                );

                //initiate score penalty
                score--;
            }
        } else {
            text(
                "Not found!",
                rgbButton2.x + rgbButton2.width + 10,
                buttonHeight + 17.5
            );

            //initiate score penalty
            score -= 2;
        }

        //set up checker to indicate word is found
        foundWord = true;
        rgbInput1.value("");

        //check if all words have already been inputted
        if (0 == wordArray.length) {
            seedScore = score;
            overGame();
        }
    }
}

//Game Over function
function overGame() {
    //dictate checker that game is over
    gameOver = true;

    //fix time value
    if (seedTime == 0) {
        seedTime = currentTime;
    } else {
        seedTime = seedTime;
    }

    //set opacity of fill for light-coloured background in line 222 to transparent (also see comment line 221)
    done = 0;

    //set up random fill background for screen
    r = random(0, 255);
    g = random(0, 255);
    b = random(0, 255);
    fill(r, g, b);
    rect(0, 0, width, height);

    //set up text display that contrasts with screen background fill
    fill(255 - r, 255 - g, 255 - b);
    textSize(18);
    textAlign(CENTER);
    textWrap(WORD);

    //regenerate header
    setHeader();

    //stop song
    songRgb.stop();

    //set win/lose sound
    if (seedScore > (words.length * 5) / 2) {
        //play win song if pass
        songWin.setVolume(vol);
        songWin.play();

        //if fail
    } else {
        //play lose song
        songLose.setVolume(vol);
        songLose.play();
    }

    //Game over text
    push();
    textSize(30);
    text(
        "You found a total of " +
        words.length +
        " words in " +
        currentTime +
        " seconds and acquired a total score of " +
        seedScore,
        (canvasSize * 103) / 160,
        canvasSize / 2
    );
    pop();
}
