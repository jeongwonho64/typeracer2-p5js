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
