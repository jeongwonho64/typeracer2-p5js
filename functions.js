//set Header
function setHeader() {
    //set border drawing slate
    push();

    //set border
    stroke(0);
    fill(100, 100, 100, 0);

    //set title border
    rect(0, 0, canvasSize * 1.5, canvasSize / 9);

    //set sidebar border
    rect((canvasSize * 103) / 80, canvasSize / 9, canvasSize, canvasSize);

    //set different fill
    push();

    //set instruction fill
    fill("darkgreen");

    //set instruction border
    rect(0, canvasSize / 9, (canvasSize * 103) / 80, lineSpacing);

    pop();
    //set instruction text
    push();

    //set alignment
    textAlign(LEFT);

    //set instruction interface details
    fill("silver").strokeWeight(0).textSize(20);

    //Check what instructions message to show depending on mode
    if (isZenMode == true) {
        //set up text
        text(
            "Please practice typing here.",
            (canvasSize * 3) / 80,
            (canvasSize * 11) / 72
        );
    } else if (isRgbMode == true) {
        //set up text
        text(
            "Please find and type the word.",
            (canvasSize * 3) / 80,
            (canvasSize * 11) / 72
        );
    } else if (isTableShown == true) {
        //set up text
        text("Check your progress.", (canvasSize * 3) / 80, (canvasSize * 11) / 72);
    } else {
        //set up text
        text(
            "Please type the following sentence.",
            (canvasSize * 3) / 80,
            (canvasSize * 11) / 72
        );
    }

    pop();

    pop();

    //set header drawing slate
    push();

    //change font
    font = "monospace";

    //set header interface details
    fill("coral").strokeWeight(0).textSize(40);
    textAlign(LEFT);

    //assign textFont to font
    textFont(font);

    //print text
    text(
        "Welcome to RacerType 2, an OOP-sponsored Typeracer",
        (canvasSize * 3) / 80,
        canvasSize / 12
    );
    pop();

    //create image
    image(
        musicNoteImg,
        canvasSize * 1.5 - (canvasSize * 3) / 16,
        canvasSize / 12 + 8 * lineSpacing,
        30,
        30
    );
}

//end programme
function endType() {
    //get total timeTaken
    gameObj.setEndTime();

    //end game
    isEndGame = true;

    //push current game object into array
    objectStatsArray.push(gameObj);
}

//display text
function setText() {
    //set x and y-coordinates for text
    let totalTextWidth = (canvasSize * 3) / 80;
    let textHeight = canvasSize / 12 + lineSpacing * 2.5;

    //set up objects containing each character
    for (i = 0; i < splitString.length; i++) {
        //set up objects
        object = new charKeyed(
            totalTextWidth,
            textHeight,
            splitString[i],
            (canvasSize * 3) / 80
        );

        //show characters
        object.display();

        //push objects into array
        charObjArray.push(object);

        //move object character x-coordinate to the right
        totalTextWidth += textWidth(splitString[i]);

        //add to spaceCounter if space is encountered
        if (object.letter == " ") {
            spaceCounter++;
        }

        //make new line if 8 words arein line
        if (spaceCounter >= 8) {
            //move x-coordinate back to the start
            totalTextWidth = (canvasSize * 3) / 80;

            //increase y-coordinate to next line
            textHeight += lineSpacing;

            //reset number of words in line
            spaceCounter = 0;
        }
    }
}

//Build slider for music volume
function setMusicVol() {
    vol = slider.value() / 100;
    song.setVolume(vol);
    songRgb.setVolume(vol);
}

function RGBType() {
    //Play song. Stop first to ensure no multiple clicks to start music
    song.stop();
    songRgb.stop();
    songRgb.setVolume(vol);
    songRgb.play();
    songRgb.loop();

    //reset background variables
    background("lightgreen");
    getVar();

    //create input
    rgbInput1 = createInput();
    rgbInput1.position((canvasSize * 3) / 80, buttonHeight);

    //create submit button
    rgbButton1 = createButton("Submit");
    rgbButton1.position(rgbInput1.x + rgbInput1.width, buttonHeight);
    rgbButton1.mousePressed(check);

    //create clear screen button
    rgbButton2 = createButton("Clear Screen");
    rgbButton2.position(
        rgbInput1.x + rgbInput1.width + rgbButton1.width + 10,
        buttonHeight
    );
    rgbButton2.mousePressed(screen);

    //ensure table does not exist
    isTableShown = false;

    isRgbMode = true;

    //call text
    //setText()
    setHeader();
}

//function triggered by Clear Screen button
function screen() {
    //dual function to slow frame rate or change colours for game over screen
    if (gameOver == false) {
        //change background
        fill(random(250, 255), random(250, 255), random(250, 255));
        rect(canvasSize / 40, canvasSize / 4, canvasSize * 1.25, canvasSize / 1.75);

        //initiate score penalty
        score -= 2;

        //reduce the frameRate randomly
        rateFrame = rateFrame - random(0.1, 0.3);
    } else {
        //initiate game over function
        overGame();
    }
}

//ensures game can be immediately stopped when time up
function halt() {
    //if time limit exceeded
    if (gameObj.immediateStopGame == true) {
        isEndGame = true;
    }
}
