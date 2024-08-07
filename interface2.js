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
    }
}