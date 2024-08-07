//calls when key is inputted
function keyPressed() {
    // Skips all checks if it's only rgb mode. Call rgbType check() if user choose press ENTER instead of button click
    if (isRgbMode == true) {
        if (keyCode == 13) {
            //check only if game is over
            if (gameOver == false) {
                check();
            }
        }
        return;
    }

    // Skips all checks if it's only zen more (practice mode)
    if (isZenMode == true || isTableShown == true || gameObj.stopGame == true) {
        return;
    }

    //gets around user autoplay policy
    userStartAudio();

    //if key is backspace and game is not over
    if (keyCode == 8 && isEndGame == false) {
        //only works if not editing the first letter
        if (counter != -1) {
            //change fill of current character
            charObjArray[counter].changeFill(-1);
            charObjArray[counter].display();

            //move back one character
            counter--;

            //if key is at first character
        } else {
            //let counter remain at first character
            counter = -1;
        }

        //if alphanumeric key is keyed and game is not over
    } else if (
        (keyCode == 32 || (keyCode >= 48 && counter < charObjArray.length - 1)) &&
        isEndGame == false
    ) {
        //assign key inputted
        let charInput = key;

        //checked if key inputted is the key supposed to be inputted
        if (charInput == charObjArray[counter + 1].letter) {
            //change fill to correct
            charObjArray[counter + 1].changeFill(1);
            charObjArray[counter + 1].display();

            //move to next character
            counter++;

            //add a correct character
            gameObj.setCharCount(1);

            //if key inputted is wrong
        } else {
            //change fill to wrong
            charObjArray[counter + 1].changeFill(0);
            charObjArray[counter + 1].display();

            //add a wrong character
            gameObj.setCharCount(0);

            //move to next index
            counter++;
        }

        //prevent windows function of using space button as a scroll to bottom of page function
        if (keyCode == 32) {
            return false;
        }

        //end game if counter is editing the character after the last character (which does not exist)
        if (counter >= charObjArray.length - 1) {
            endType();
            counter = 1000000000000000000;
        }
    }

    //set up bottom message
    push();

    //set up background rectangle user interface
    fill("lightgreen");
    noStroke();

    //create background rectangle
    rect(
        0,
        (canvasSize * 54) / 80,
        (canvasSize * 103) / 80 - 10,
        (canvasSize * 13) / 80
    );

    //set up text user interface
    fill("teal");
    textAlign(CENTER);
    textSize((canvasSize * 3) / 80);

    //display accuracy percentage text
    text(
        "Your accuracy percentage is: " +
        round(gameObj.accuracyPercentage, 2) +
        "%",
        (canvasSize * 103) / 160,
        (canvasSize * 65) / 80
    );

    //if game is ended
    if (isEndGame == true) {
        //end game if counter is editing after the time limit (which does not exist)
        if (gameObj.mode == "45s Countdown" && gameObj.immediateStopGame == true) {
            endType();
            counter = 1000000000000000000;
        }

        //display character per second text
        text(
            "Your total characters typed per second is: " +
            round(gameObj.totalChars / gameObj.timeTakenInSec, 2) +
            " characters / second",
            (canvasSize * 103) / 160,
            (canvasSize * 57) / 80
        );

        //determine winLose
        gameObj.call();

        //plays appropriate music
        if (gameObj.winLose == "lose") {
            //stop the song
            song.stop();

            //play lose song
            songLose.setVolume(vol);
            songLose.play();

            //if win
        } else {
            //stop the song
            song.stop();

            //play victory song
            songWin.setVolume(vol);
            songWin.play();
        }

        //stop changing timer
        isTimeShown = false;
    }

    pop();
}

//show table
function setRadioClicked() {
    //set radio values
    radioVal = this.value();

    //remove table if existent
    if (tableDatabase != null) {
        //remove tableDatabase
        tableDatabase.remove();
    }

    //radio selected
    isRadioSelected = true;

    //table removed
    isTableShown = false;

    //generate stats
    showStats();
}
